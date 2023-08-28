import { createClient } from "redis";

const createRedisClient = async () => {
  const redisClient = createClient({
    url: process.env.REDIS_URL,
  });
  redisClient.on("error", (error) => console.log(error));
  await redisClient.connect();

  return redisClient;
};

export default createRedisClient;
