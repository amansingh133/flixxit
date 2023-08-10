import express from "express";
import passport from "../../config/passport.js";

import {
  cancelSubscription,
  checkSubscriptionStatus,
  handleSubscriptionRequest,
} from "../../controllers/content/subscription.js";

const router = express.Router();

router.get(
  "/status",
  passport.authenticate("jwt", { session: false }),
  checkSubscriptionStatus
);

router.post(
  "/subscribe",
  passport.authenticate("jwt", { session: false }),
  handleSubscriptionRequest
);

router.post(
  "/cancel",
  passport.authenticate("jwt", { session: false }),
  cancelSubscription
);

export default router;
