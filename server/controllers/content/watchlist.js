import Watchlist from "../../models/watchlist.js";

export const addToWatchList = async (req, res) => {
  const { userId, contentId } = req.body;

  try {
    const watchlist = await Watchlist.findOne({ user: userId });

    if (!watchlist) {
      const newWatchList = new Watchlist({
        user: userId,
        items: [{ content: contentId }],
      });
      await newWatchList.save();
    } else {
      watchlist.items.push({ content: contentId });
      await watchlist.save();
    }
    res
      .status(200)
      .json({ message: "Content added to watchlist successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const removeFromWatchList = async (req, res) => {
  const { userId, contentId } = req.body;

  try {
    const watchlist = await Watchlist.findOne({ user: userId });

    if (!watchlist) {
      return res.status(404).json({ error: "Watchlist not found" });
    }

    watchlist.items = watchlist.items.filter(
      (item) => item.content.toString() !== contentId
    );
    await watchlist.save();

    res
      .status(200)
      .json({ message: "Content removed from watchlist successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getWatchList = async (req, res) => {
  const { userId } = req.params;

  try {
    const watchlist = await Watchlist.findOne({
      user: userId,
    }).populate("items.content");

    if (!watchlist) {
      return res.status(404).json({ error: "Watchlist not found" });
    }

    res.status(200).json(watchlist.items);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const markContentAsWatched = async (req, res) => {
  const { userId, contentId } = req.params;

  try {
    const watchlist = await Watchlist.findOne({ user: userId });

    if (!watchlist) {
      return res.status(404).json({ error: "Watchlist not found" });
    }

    const contentIndex = watchlist.items.findIndex(
      (item) => item.content.toString() === contentId
    );

    if (contentIndex === -1) {
      return res.status(404).json({ error: "Content not found in watchlist" });
    }

    watchlist.items[contentIndex].watched = true;
    await watchlist.save();

    if (watchlist.items[contentIndex].watched) {
      watchlist.items.splice(contentIndex, 1);
      await watchlist.save();
    }

    res.status(200).json({
      message: "Content marked as watched and removed from watchlist",
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
