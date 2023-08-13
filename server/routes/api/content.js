import express from "express";
import passport from "../../config/passport.js";

import {
  getConsumptionHistory,
  logContentConsumption,
} from "../../controllers/content/consumption.js";
import { getContentSuggestions } from "../../controllers/content/get-suggestions.js";
import {
  updateUserPreferences,
  getUserPreferences,
} from "../../controllers/content/preferences.js";
import {
  getAllContent,
  getOneContent,
  getContentByCategory,
  getContentByGenre,
} from "../../controllers/content/get-content.js";
import {
  downvoteContent,
  upvoteContent,
} from "../../controllers/content/rating.js";

const router = express.Router();

router.get(
  "/suggestions",
  passport.authenticate("jwt", { session: false }),
  getContentSuggestions
);

router
  .route("/consumption")
  .get(passport.authenticate("jwt", { session: false }), getConsumptionHistory)
  .post(
    passport.authenticate("jwt", { session: false }),
    logContentConsumption
  );

router
  .route("/preferences")
  .get(passport.authenticate("jwt", { session: false }), getUserPreferences)
  .put(passport.authenticate("jwt", { session: false }), updateUserPreferences);

router.get(
  "/category/:category",
  passport.authenticate("jwt", { session: false }),
  getContentByCategory
);
router.get(
  "/genre/:genre",
  passport.authenticate("jwt", { session: false }),
  getContentByGenre
);

router.put(
  "/:id/upvote",
  passport.authenticate("jwt", { session: false }),
  upvoteContent
);
router.put(
  "/:id/downvote",
  passport.authenticate("jwt", { session: false }),
  downvoteContent
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getOneContent
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllContent
);

export default router;
