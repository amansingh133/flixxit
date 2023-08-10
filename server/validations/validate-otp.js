import User from "../models/user.js";

export const validateOtp = async (req, res) => {
  const { otp } = req.body;
  const parsedOtp = Number(otp);
  const email = req.user.email;

  try {
    const user = await User.findOne({ email });
    if (
      user.passwordResetOtp === parsedOtp &&
      user.otpExpiry !== null &&
      user.otpExpiry > Date.now()
    ) {
      return res.status(200).json({ message: "OTP validation successful" });
    }

    if (user.passwordResetOtp !== parsedOtp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    if (user.otpExpiry === null) {
      return res.status(400).json({ error: "Token has expired" });
    }

    if (user.otpExpiry <= Date.now()) {
      user.passwordResetOtp = null;
      user.otpExpiry = null;
      await user.save();
      return res.status(400).json({ error: "Token has expired" });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
