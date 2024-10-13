import Redis from 'ioredis';

let redisClient = null;

export const getRedisConnection = () => {
  if (!redisClient) {
    redisClient = new Redis({
      // Configure your Redis connection options here
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      // Add any other options you need, such as password, db number, etc.
    });

    redisClient.on('error', (err) => {
      console.error('Redis connection error:', err);
    });

    redisClient.on('connect', () => {
      console.log('Connected to Redis');
    });
  }

  return redisClient;
};