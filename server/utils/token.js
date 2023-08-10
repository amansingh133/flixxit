import jwt from "jsonwebtoken";

export const generateJwtToken = async function (payload, expiresIn) {
  const token = jwt.sign(payload, process.env.jwtPrivateKey, {
    expiresIn: expiresIn,
  });
  return token;
};

export const generateRefreshToken = async function (payload, expiresIn) {
  const refreshToken = jwt.sign(payload, process.env.refreshTokenKey, {
    expiresIn: expiresIn,
  });
  return refreshToken;
};
