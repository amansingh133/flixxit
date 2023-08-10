import User from "../../models/user.js";
import Preferences from "../../models/preferences.js";

export const updateUserPreferences = async (req, res) => {
  try {
    const userId = req.user._id;
    const updates = req.body;

    if (updates.preferences) {
      const preferences = await Preferences.findOneAndUpdate(
        { userId },
        updates.preferences,
        { upsert: true, new: true }
      );
      await User.findByIdAndUpdate(userId, { preferences: preferences._id });
    }

    await User.findByIdAndUpdate(userId, updates);
    res.json({ message: "Preferences updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const getUserPreferences = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).populate("preferences");
    res.json(user.preferences);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
