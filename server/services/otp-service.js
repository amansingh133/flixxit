import { generateOtp } from "../utils/generate-otp.js";

export const resetOtp = async () => {
  const resetOtp = generateOtp();

  return resetOtp;
};
