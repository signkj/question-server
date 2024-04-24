import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  (): Record<string, any> => ({
    as_node: process.env.AS_NODE || 'https://localhost:9092',
    node_name: process.env.AS_NODE_UESRNAME || 'asnode1',
    http: {
      host: process.env.APP_HOST || 'ts',
      port: Number(process.env.APP_PORT) || 3000,
    },
    node_pass: process.env.AS_NODE_PASSWORD || 'asnode1',
    jwt: {
      access_secret: process.env.JWT_ACCESS_SECRET || 'secret',
      refresh_secret: process.env.JWT_REFRESH_SECRET || 'secret',
      access_expiration: process.env.JWT_ACCESS_EXPIRATION_TIME || '30d',
      refresh_expiration: process.env.JWT_REFRESH_EXPIRATION_TIME || '40d',
    },
  }),
);
