import Preferences from "../../models/preferences.js";

export const updateUserPreferences = async (req, res) => {
  const userId = req.user._id;
  const { genre, category, language } = req.body;

  try {
    const preference = await Preferences.findOneAndUpdate(
      { userId },
      { genre, category, language },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      message: "Preferences updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const getUserPreferences = async (req, res) => {
  const userId = req.user._id;

  try {
    const preference = await Preferences.findOne({ userId });

    if (!preference) {
      return res.status(404).json({ message: "User has no preferences" });
    }

    return res.status(200).json({ preferences: preference });
  } catch (error) {
    console.error("Error getting preferences:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
