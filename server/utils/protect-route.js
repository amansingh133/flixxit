import rateLimit from "express-rate-limit";

const createRateLimiter = (
  windowMs = process.env.windowsMs,
  max = process.env.maxRequests
) => {
  return rateLimit({
    windowMs,
    max,
  });
};

export const limiter = createRateLimiter();
export const passwordRequestLimiter = createRateLimiter(5 * 60 * 1000, 1);
