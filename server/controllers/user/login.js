import User from "../../models/user.js";
import { generateJwtToken, generateRefreshToken } from "../../utils/token.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: "No user exists with this email. Please sign up.",
        redirectUrl: "/signup",
      });
    }

    const isPasswordValid = await user.checkPassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const isFirstLogin = !user.accountDetails.lastLoggedIn;

    await user.updateLoggedIn();

    const payload = {
      sub: user._id,
      name: user.name,
      email: user.email,
    };

    const accessToken = await generateJwtToken(
      payload,
      process.env.tokenExpirationDuration
    );

    const refreshToken = await generateRefreshToken(
      payload,
      process.env.refreshTokenExpiration
    );

    user.refreshToken = refreshToken;
    await user.save();

    const cookieOptions = {
      httpOnly: true,
      maxAge: 2 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "lax",
    };

    console.log(
      "Token Expiration Duration:",
      process.env.tokenExpirationDuration
    );
    console.log(
      "Refresh Token Expiration:",
      process.env.refreshTokenExpiration
    );

    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.status(200).json({ accessToken, isFirstLogin });
  } catch (error) {
    console.log(
      "Token Expiration Duration:",
      process.env.tokenExpirationDuration
    );
    console.log(
      "Refresh Token Expiration:",
      process.env.refreshTokenExpiration
    );

    console.log(error);
    return res.status(500).json({ error: error });
  }
};

export default loginUser;
