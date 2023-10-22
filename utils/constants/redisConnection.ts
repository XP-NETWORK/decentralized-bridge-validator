import IORedis from 'ioredis';

const redisIOConnection = new IORedis({ port: 6380 });

export default redisIOConnection;