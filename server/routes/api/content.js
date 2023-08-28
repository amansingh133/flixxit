import express from "express";
import passport from "../../config/passport.js";

import {
  getConsumptionHistory,
  logContentConsumption,
} from "../../controllers/content/consumption.js";
import { getSuggestions } from "../../controllers/content/get-suggestions.js";

import {
  getAllContent,
  getOneContent,
  getContentByCategory,
  getContentByGenre,
} from "../../controllers/content/get-content.js";
import {
  voteContent,
  checkUserVote,
} from "../../controllers/content/rating.js";

import {
  serveAllContentFromCache,
  serverOneContentFromCache,
  serveSuggestions,
} from "../../controllers/content/cache.js";

const router = express.Router();

router.get(
  "/suggestions",
  passport.authenticate("jwt", { session: false }),
  // serveSuggestions(),
  getSuggestions
);

router
  .route("/consumption")
  .get(passport.authenticate("jwt", { session: false }), getConsumptionHistory)
  .post(
    passport.authenticate("jwt", { session: false }),
    logContentConsumption
  );

router.get(
  "/category/:category",
  passport.authenticate("jwt", { session: false }),
  checkUserVote,
  getContentByCategory
);
router.get(
  "/genre/:genre",
  passport.authenticate("jwt", { session: false }),
  checkUserVote,
  getContentByGenre
);

router.post(
  "/vote/:id",
  passport.authenticate("jwt", { session: false }),
  checkUserVote,
  voteContent
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  // serverOneContentFromCache(),
  checkUserVote,
  getOneContent
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  // serveAllContentFromCache(),
  getAllContent
);

export default router;
