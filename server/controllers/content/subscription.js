import User from "../../models/user.js";

export const handleSubscriptionRequest = async (req, res) => {
  const { type } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.updateSubscription(type);

    const invoice = {
      subscriptionType: type,
      paymentDate: user.accountDetails.subscription.paymentDate,
      expirationDate: user.accountDetails.subscription.expirationDate,
    };

    res.json({ message: "Subscription successful", invoice });
  } catch (error) {
    console.error("Error handling subscription:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const cancelSubscription = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.cancelSubscription();

    const invoice = {
      cancellationDate: new Date(),
    };
    res.json({ message: "Subscription cancelled", invoice });
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const checkSubscriptionStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { isSubscribed, subscriptionType, paymentDate, expirationDate } =
      user.accountDetails.subscription;

    res.json({
      isSubscribed,
      subscriptionType,
      paymentDate,
      expirationDate,
    });
  } catch (error) {
    console.error("Error checking subscription status:", error);
    res.status(500).json({ error: "Server error" });
  }
};
