import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  synopsis: { type: String, required: true },
  genres: [{ type: String, required: true }],
  category: { type: String, required: true },
  background_path: { type: String, required: true },
  rating: {
    upvotes: {
      count: { type: Number, default: 0, min: 0 },
      users: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User", _id: false },
      ],
    },
    downvotes: {
      count: { type: Number, default: 0, min: 0 },
      users: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User", _id: false },
      ],
    },
  },
  videoUrls: {
    resolution_720p: { type: String, required: true },
    resolution_1080p: { type: String, required: true },
  },
});

const Content = mongoose.model("Content", contentSchema);

export default Content;
