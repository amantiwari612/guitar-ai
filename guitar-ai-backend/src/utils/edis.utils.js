import redisClient from "../config/redis";

export const setCache = async (key, value, ttlSeconds = 300) => {
  await redisClient.set(key, JSON.stringify(value), {
    EX: ttlSeconds,
  });
};

export const getCache = async (key) => {
  const value = await redisClient.get(key);

  if (!value) return null;

  return JSON.parse(value);
};

export const deleteCache = async (key) => {
  return redisClient.del(key);
};