import mongoose from "mongoose";

const consumptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      _id: false,
      content: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Content",
      },
      date: { type: Date, default: Date.now },
    },
  ],
});

consumptionSchema.index(
  { "items.date": 1 },
  { expireAfterSeconds: 7 * 24 * 60 * 60 }
);

const Consumption = mongoose.model("Consumption", consumptionSchema);

export default Consumption;
