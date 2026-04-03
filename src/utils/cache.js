const redis = require('redis');
const dotenv = require('dotenv');

dotenv.config();

const redisClient = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

let isConnected = false;

const connectRedis = async () => {
    try {
        await redisClient.connect();
        isConnected = true;
        console.log('Redis Connected Successfully');
    } catch (err) {
        console.error('Redis connection failed:', err.message);
        isConnected = false;
    }
};

// Auto connect
connectRedis();

const getCache = async (key) => {
    if (!isConnected) return null;
    try {
        const value = await redisClient.get(key);
        return value ? JSON.parse(value) : null;
    } catch (err) {
        console.error('Redis Get Error:', err);
        return null;
    }
};

const setCache = async (key, value, duration = 3600) => {
    if (!isConnected) return;
    try {
        await redisClient.set(key, JSON.stringify(value), {
            EX: duration
        });
    } catch (err) {
        console.error('Redis Set Error:', err);
    }
};

const delCache = async (key) => {
    if (!isConnected) return;
    try {
        await redisClient.del(key);
    } catch (err) {
        console.error('Redis Delete Error:', err);
    }
};

const flushCache = async (pattern) => {
    if (!isConnected) return;
    try {
        // Simple flush for now or scan/del for patterns
        // If pattern is used, we can delete specific keys
        await redisClient.flushDb(); 
        console.log('Cache flushed');
    } catch (err) {
        console.error('Redis Flush Error:', err);
    }
};

module.exports = {
    getCache,
    setCache,
    delCache,
    flushCache
};
