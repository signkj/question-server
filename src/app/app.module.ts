import { Module } from '@nestjs/common';
import Configs from '../config/index';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseOptionsService } from 'src/database/service/database.options.service';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { QuestionModule } from 'src/crud/question/question.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: Configs,
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [DatabaseOptionsService],
      imports: [DatabaseModule],
      useFactory: (databaseOptionsService: DatabaseOptionsService) =>
        databaseOptionsService.createTypeOrmOptions(),
    }),
    DatabaseModule,
    QuestionModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
