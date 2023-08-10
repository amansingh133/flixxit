import mongoose from "mongoose";

const preferencesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  genres: [String],
});

const Preferences = mongoose.model("Preferences", preferencesSchema);

export default Preferences;
