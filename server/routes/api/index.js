import express from "express";

import userRoutes from "./user.js";
import contentRoutes from "./content.js";
import watchlistRoutes from "./watchlist.js";
import subscriptionRoutes from "./subscription.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/content", contentRoutes);
router.use("/watchlist", watchlistRoutes);
router.use("/subscription", subscriptionRoutes);
router.use(catchAll);

export default router;
