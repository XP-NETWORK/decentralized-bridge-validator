import IORedis from 'ioredis';


let redisIOConnection: IORedis | null = null;

const getRedisConnection = (): IORedis => {
    if (!redisIOConnection) {
        redisIOConnection = new IORedis();
    }
    return redisIOConnection;
}

export default getRedisConnection