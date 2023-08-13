import express from "express";
import passport from "../../config/passport.js";

import {
  addToWatchList,
  removeFromWatchList,
  getWatchList,
  markContentAsWatched,
  checkContentInWatchlist,
} from "../../controllers/content/watchlist.js";

const router = express.Router();

router.patch(
  "/:userId/:contentId/watched",
  passport.authenticate("jwt", { session: false }),
  markContentAsWatched
);

router
  .route("/:userId/:contentId")
  .get(
    passport.authenticate("jwt", { session: false }),
    checkContentInWatchlist
  )
  .post(passport.authenticate("jwt", { session: false }), addToWatchList)
  .delete(
    passport.authenticate("jwt", { session: false }),
    removeFromWatchList
  );

router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  getWatchList
);

export default router;
