import { MidwayConfig } from '@midwayjs/core';

export default {
  keys: '1719990379385_8994',
  orm: {
    type: 'sqlite',
    database: '../../mydata.db',
    synchronize: true,
    logging: true,
  },
  koa: {
    port: 7002,
  },
  webSocket: {},
  cors: {
    origin: '*',
  },
} as MidwayConfig;
