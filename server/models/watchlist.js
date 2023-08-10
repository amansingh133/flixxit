import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
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
