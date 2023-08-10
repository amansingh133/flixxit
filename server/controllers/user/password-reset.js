import { resetOtp } from "../../services/otp-service.js";
import { sendResetOtp } from "../../services/email-service.js";
import { generateJwtToken, generateRefreshToken } from "../../utils/token.js";
import User from "../../models/user.js";

export const resetPasswordRequest = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "No user exists with this email." });
    }

    const otp = await resetOtp(user);
    sendResetOtp(email, otp);

    const payload = {
      sub: user._id,
      name: user.name,
      email: user.email,
    };

    const newToken = await generateJwtToken(payload, 5 * 60 * 1000);
    const refreshToken = await generateRefreshToken(payload, 5 * 60 * 1000);

    user.passwordResetOtp = otp;
    user.otpExpiry = new Date(Date.now() + 300000);
    user.refreshToken = refreshToken;
    await user.save();

    const cookieOptions = {
      httpOnly: true,
      maxAge: 5 * 60 * 1000,
      secure: true,
      sameSite: "lax",
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.status(200).json({
      message: "Password reset OTP sent successfully",
      accessToken: newToken,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const email = req.user.email;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      return res.status(204);
    }

    user.refreshToken = null;
    user.password = newPassword;
    user.passwordResetOtp = null;
    user.otpExpiry = null;

    await user.logout();
    await user.save();

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
