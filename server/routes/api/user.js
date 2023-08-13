import express from "express";
import signUpUser from "../../controllers/user/signup.js";
import loginUser from "../../controllers/user/login.js";
import logoutUser from "../../controllers/user/logout.js";
import passport from "../../config/passport.js";
import {
  loginUserValidation,
  signUpUserValidation,
  validatePasswordReset,
} from "../../validations/user.js";
import {
  resetPassword,
  resetPasswordRequest,
} from "../../controllers/user/password-reset.js";
import { validateOtp } from "../../validations/validate-otp.js";
import { passwordRequestLimiter } from "../../utils/protect-route.js";
import { refreshAccessToken } from "../../validations/refresh-token.js";
import { getProfile } from "../../controllers/user/get-profile.js";

const router = express.Router();

router.post("/signup", signUpUserValidation, signUpUser);

router.post("/login", loginUserValidation, loginUser);

router.get("/refreshToken", refreshAccessToken);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  getProfile
);

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  logoutUser
);

router.post(
  "/reset-password-request",
  passwordRequestLimiter,
  resetPasswordRequest
);

router.post(
  "/validate-otp",
  passport.authenticate("jwt", { session: false }),
  validateOtp
);

router.post(
  "/reset-password",
  passport.authenticate("jwt", { session: false }),
  validatePasswordReset,
  resetPassword
);

router.get;

export default router;
