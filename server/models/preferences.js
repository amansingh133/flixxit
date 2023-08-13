import mongoose from "mongoose";

const preferenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  genre: [
    {
      type: String,
    },
  ],
  category: [
    {
      type: String,
    },
  ],
  language: [
    {
      type: String,
    },
  ],
});

const Preference = mongoose.model("Preferences", preferenceSchema);

export default Preference;
