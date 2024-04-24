import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // app.use(cookieParser());

  await app.listen(process.env.PORT);

  const logger = new Logger();
  logger.log(`Application is running on: ${process.env.PORT}`);
}
bootstrap();
