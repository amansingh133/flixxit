import { generateJwtToken } from "../utils/token.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const refreshAccessToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refreshToken) {
    return res.sendStatus(403);
  }

  const refreshToken = cookies.refreshToken;

  try {
    const decoded = jwt.verify(refreshToken, process.env.refreshTokenKey);
    let user;

    try {
      user = await User.findOne({ _id: decoded.sub });
    } catch (err) {
      return res.status(403).json({ message: "Error finding user" });
    }

    if (!decoded || user.email !== decoded.email) {
      return res.status(403).json({ message: "No user found" });
    }

    const newAccessToken = await generateJwtToken(
      { sub: user._id, name: user.name, email: user.email },
      "4h"
    );

    res.status(200).json({
      message: "New access token generated",
      accessToken: newAccessToken,
    });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token Expired" });
    } else {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
  }
};
