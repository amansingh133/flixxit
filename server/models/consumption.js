import mongoose from "mongoose";

const consumptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  contentId: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Consumption = mongoose.model("Consumption", consumptionSchema);

export default Consumption;
