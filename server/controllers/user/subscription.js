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

    return res
      .status(200)
      .json({ message: "Subscription successful", invoice });
  } catch (error) {
    console.error("Error handling subscription:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const cancelSubscription = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.cancelSubscription();

    const cancellationDate = new Date();

    return res
      .status(200)
      .json({ message: "Subscription cancelled", cancellationDate });
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    return res.status(500).json({ error: "Server error" });
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

    return res.status(200).json({
      email: user.email,
      isSubscribed,
      subscriptionType,
      paymentDate,
      expirationDate,
    });
  } catch (error) {
    console.error("Error checking subscription status:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
