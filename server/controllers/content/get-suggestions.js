import Content from "../../models/content.js";
import Preference from "../../models/preferences.js";
import Consumption from "../../models/consumption.js";
import { cacheContent } from "./cache.js";

export const getSuggestions = async (req, res) => {
  const userId = req.user._id;

  try {
    const userPreferences = await Preference.findOne({ userId });

    const userGenres = userPreferences?.genre || [];
    const userCategories = userPreferences?.category || [];

    const consumptionHistory = await Consumption.findOne({ userId });

    const consumedIds =
      consumptionHistory?.items.map((consumption) => consumption.content._id) ||
      [];

    const genreSuggestions = await Content.find({
      genres: { $in: userGenres },
      _id: { $nin: consumedIds },
    });

    const categorySuggestions = await Content.find({
      category: { $in: userCategories },
      _id: { $nin: consumedIds },
    });

    const remainingLimit =
      7 - (genreSuggestions.length + categorySuggestions.length);

    const remainingSuggestions = await Content.find({
      _id: { $nin: consumedIds },
    }).limit(remainingLimit);

    const suggestions = [
      ...genreSuggestions,
      ...categorySuggestions,
      ...remainingSuggestions,
    ];

    if (suggestions.length === 0) {
      return res.status(200).json([]);
    }

    cacheContent("suggestions", suggestions);

    return res.status(200).json(suggestions);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};
