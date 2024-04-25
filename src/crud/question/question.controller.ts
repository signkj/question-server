import { Controller, Get, Body, Param, Put } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';

import { WriteQuestionDto } from './dto/insert-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Put()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Put('/my/:id')
  insertQuestion(@Param('id') id: string, @Body() dto: WriteQuestionDto) {
    return this.questionService.writeQuestion(+id, dto);
  }

  //각 설문지의 투표 내용을 가져옴
  @Get('result/:id')
  getResult(@Param('id') id: string) {
    return this.questionService.getResult(+id);
  }

  //설문결과 토대로 통계를 내어줌
  @Get('statistics/:id')
  getStatistic(@Param('id') id: string) {
    return this.questionService.getStatistic(+id);
  }
}
