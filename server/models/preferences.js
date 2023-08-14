import mongoose from "mongoose";

const preferenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  genre: [
    {
      _id: false,
      type: String,
    },
  ],
  category: [
    {
      _id: false,
      type: String,
    },
  ],
  language: [
    {
      _id: false,
      type: String,
    },
  ],
});

const Preference = mongoose.model("Preferences", preferenceSchema);

export default Preference;
