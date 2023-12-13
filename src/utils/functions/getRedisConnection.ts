import IORedis from 'ioredis';


let redisIOConnection: IORedis | null = null;

const getRedisConnection = (): IORedis => {
    if (!redisIOConnection) {
        redisIOConnection = new IORedis({ maxRetriesPerRequest: null });
        redisIOConnection.setMaxListeners(18); // number of time createJobWithWoker is initiated x2 ( 7x2 = 14 ) 
    }
    return redisIOConnection;
}

export default getRedisConnection