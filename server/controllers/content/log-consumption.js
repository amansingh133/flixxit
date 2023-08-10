import Consumption from "../../models/consumption.js";

export const logContentConsumption = async (req, res) => {
  try {
    const userId = req.user._id;
    const { contentId } = req.body;
    const consumption = new Consumption({ userId, contentId });
    await consumption.save();
    res.json({ message: "Content consumotion logged successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
