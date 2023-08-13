import Consumption from "../../models/consumption.js";

export const logContentConsumption = async (req, res) => {
  try {
    const userId = req.user._id;
    const { contentId } = req.body;

    const existingConsumption = await Consumption.findOneAndUpdate(
      { userId, "items.content": contentId },
      { $set: { "items.$.date": new Date() } }
    );

    if (!existingConsumption) {
      let consumption = await Consumption.findOne({ userId });

      if (!consumption) {
        consumption = Consumption.create({ userId });
      }
      consumption.items.push({ content: contentId, date: new Date() });
      await consumption.save();
    }

    res.json({ message: "Content consumotion logged successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getConsumptionHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    const consumptionHistory = await Consumption.findOne({ userId }).populate(
      "items.content"
    );

    if (!consumptionHistory) {
      return res.status(404).json({ message: "No consumption history found." });
    }
    res.json({ consumptionHistory });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
