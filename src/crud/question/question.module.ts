import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Question,
  QuestionMain,
  QuestionOption,
  QuestionRecv,
} from 'src/packet/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionMain,
      Question,
      QuestionRecv,
      QuestionOption,
    ]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
