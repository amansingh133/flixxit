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
        try {
          consumption = await Consumption.create({ userId });
        } catch (error) {
          console.error("Error creating consumption:", error);
          return res
            .status(500)
            .json({ error: "Failed to create consumption." });
        }
      }
      consumption.items.push({ content: contentId, date: new Date() });
      await consumption.save();
    }

    return res
      .status(200)
      .json({ message: "Content consumption logged successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
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
    return res.status(200).json({ consumptionHistory });
  } catch (error) {
    console.error("Error fetching consumption history:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
