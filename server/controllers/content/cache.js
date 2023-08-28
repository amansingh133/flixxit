import createRedisClient from "../../cache/index.js";

const redisClient = await createRedisClient();

const cacheContent = (key, content, expiry = 300) => {
  redisClient.setEx(key, expiry, JSON.stringify(content));
};

const deleteCache = (key) => {
  if (Array.isArray(key)) {
    return key.forEach((k) => redisClient.del(k));
  }

  return redisClient.del(key);
};

const serveAllContentFromCache = () => (req, res, next) =>
  redisClient
    .get("all_content")
    .then((reply) => {
      if (!reply) {
        return next();
      }
      res.json(JSON.parse(reply));
    })
    .catch((error) => {
      console.error(error);
      next();
    });

const serverOneContentFromCache = () => (req, res, next) =>
  redisClient
    .get(`content/:${req.params.id}`)
    .then((reply) => {
      if (!reply) {
        return next();
      }

      res.json(JSON.parse(reply));
    })
    .catch((error) => {
      console.error(error);
      next();
    });

const serveSuggestions = () => (req, res, next) =>
  redisClient
    .get("suggestions")
    .then((reply) => {
      if (!reply) {
        return next();
      }
      res.json(JSON.parse(reply));
    })
    .catch((error) => {
      console.error(error);
      next();
    });

export {
  cacheContent,
  deleteCache,
  serveAllContentFromCache,
  serverOneContentFromCache,
  serveSuggestions,
};
