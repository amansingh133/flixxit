import express from "express";
import passport from "../../config/passport.js";

import {
  addToWatchList,
  removeFromWatchList,
  getWatchList,
  markContentAsWatched,
} from "../../controllers/content/watchlist.js";

const router = express.Router();

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  addToWatchList
);

router.put(
  "/:userId/:contentId/watched",
  passport.authenticate("jwt", { session: false }),
  markContentAsWatched
);

router.delete(
  "/:userId/:contentId",
  passport.authenticate("jwt", { session: false }),
  removeFromWatchList
);

router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  getWatchList
);

export default router;
