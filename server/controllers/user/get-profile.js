import User from "../../models/user.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    const {
      password,
      refreshToken,
      passwordResetOtp,
      otpExpiry,
      ...userDetails
    } = user.toObject();
    res.status(200).json(userDetails);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
