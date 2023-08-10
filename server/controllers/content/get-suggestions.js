import Content from "../../models/content.js";
import User from "../../models/user.js";

export const getContentSuggestions = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId)
      .populate("preferences")
      .populate("consumptionHistory");
    const userGenres = user.preferences.genres;

    const consumedContentIds = user.consumptionHistory.map(
      (consumption) => consumption.contentId
    );

    const suggestions = await Content.find({
      genres: { $in: userGenres },
      _id: { $nin: consumedContentIds },
    }).limit(5);

    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
