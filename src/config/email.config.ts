import { registerAs } from '@nestjs/config';

export default registerAs(
  'email',
  (): Record<string, any> => ({
    auth: {
      id: process.env.EMAIL_AUTH_EMAIL,
      password: process.env.EMAIL_AUTH_PASSWORD,
      host: process.env.EMAIL_HOST,
      office: process.env.EMAIL_FROM,
    },
  }),
);
