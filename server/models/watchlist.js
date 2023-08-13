import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      _id: false,
      content: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Content",
        required: true,
      },
      addedAt: { type: Date, default: Date.now },
      watched: { type: Boolean, default: false },
    },
  ],
});

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

export default Watchlist;
