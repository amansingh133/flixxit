import Watchlist from "../../models/watchlist.js";

export const addToWatchList = async (req, res) => {
  const { userId, contentId } = req.params;

  try {
    if (!userId || !contentId) {
      return res
        .status(400)
        .json({ message: "Both userId and contentId are required." });
    }

    const watchlist = await Watchlist.findOne({ userId });

    if (!watchlist) {
      await Watchlist.create({ userId, items: [{ content: contentId }] });
      return res.status(200).json({ message: "Added to watchlist." });
    }

    const existingItem = watchlist.items.find((item) =>
      item.content.equals(contentId)
    );

    if (existingItem) {
      return res.status(201).json({ message: "Already added to watchlist." });
    }

    watchlist.items.push({ content: contentId });
    await watchlist.save();

    return res.status(200).json({ message: "Added to watchlist." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const removeFromWatchList = async (req, res) => {
  const { userId, contentId } = req.params;

  try {
    if (!userId || !contentId) {
      return res
        .status(400)
        .json({ message: "Both userId and contentId are required." });
    }

    const watchlist = await Watchlist.findOne({ userId });

    if (!watchlist) {
      return res.status(404).json({ message: "Watchlist not found." });
    }

    const itemIndex = watchlist.items.findIndex((item) =>
      item.content.equals(contentId)
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ message: "Item not found in the watchlist." });
    }

    watchlist.items.splice(itemIndex, 1);
    await watchlist.save();

    return res.status(200).json({ message: "Item removed from watchlist." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getWatchList = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({ message: "userId is required." });
    }

    const watchlist = await Watchlist.findOne({ userId }).populate(
      "items.content"
    );

    if (!watchlist) {
      return res.status(200).json({ message: "Watchlist not found." });
    }

    const items = watchlist.items;

    items.sort((a, b) => b.addedAt - a.addedAt);

    return res.status(200).json({ items });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const markContentAsWatched = async (req, res) => {
  const { userId, contentId } = req.params;

  try {
    if (!userId || !contentId) {
      return res
        .status(400)
        .json({ message: "Both userId and contentId are required." });
    }

    const watchlist = await Watchlist.findOne({ userId });

    if (!watchlist) {
      return res.status(404).json({ message: "Watchlist not found." });
    }

    const item = watchlist.items.find((item) => item.content.equals(contentId));

    if (!item) {
      return res
        .status(404)
        .json({ message: "Item not found in the watchlist." });
    }

    item.watched = !item.watched;
    await watchlist.save();

    return res
      .status(200)
      .json({ status: item.watched, message: "Content marked as watched." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const checkContentInWatchlist = async (req, res) => {
  const { userId, contentId } = req.params;

  try {
    if (!userId || !contentId) {
      return res
        .status(400)
        .json({ message: "Both userId and contentId are required." });
    }

    const watchlist = await Watchlist.findOne({ userId });

    if (!watchlist) {
      return res.status(200).json({ message: "Watchlist not found." });
    }

    const item = watchlist.items.find((item) => item.content.equals(contentId));

    if (!item) {
      return res
        .status(200)
        .json({ present: false, message: "Item not found in the watchlist." });
    }

    return res
      .status(200)
      .json({ present: true, message: "Item found in the watchlist." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
