import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question, QuestionMain } from 'src/packet/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionMain)
    private readonly repoQuestionMain: Repository<QuestionMain>,
    @InjectRepository(Question)
    private readonly repoQuestion: Repository<Question>,
  ) {}

  async create(dto: CreateQuestionDto) {
    const newQuestion = this.repoQuestionMain.create({
      title: dto.title,
      description: dto.description,
      ques_cnt: dto.questions.length,
      email: dto.email,
    });
    const result = await this.repoQuestionMain.save(newQuestion);

    dto.questions.forEach(async (q) => {
      const newQ = this.repoQuestion.create({
        qmain_id: result.id,
        type: q.type,
        title: q.name,
        optionyn: q.optionyn,
      });
      await this.repoQuestion.save(newQ);
    });

    return {
      code: 200,
      message: 'success',
      time: Date(),
      result,
    };
  }

  async findAll() {
    const list = await this.repoQuestionMain.find({
      select: ['id', 'email', 'title', 'description'],
      order: { createdAt: 'ASC' },
    });

    if (!list) {
      return {
        code: 404,
        message: 'not found',
        time: Date(),
        result: null,
      };
    }
    return {
      code: 200,
      message: 'success',
      time: Date(),
      result: {
        list,
      },
    };
  }

  async findOne(id: number) {
    const main = await this.repoQuestionMain.findOneBy({ id });

    if (!main) {
      return {
        code: 404,
        message: 'not found',
        time: Date(),
        result: null,
      };
    }

    const list = await this.repoQuestion.find({
      select: ['type', 'title', 'optionyn'],
      where: { qmain_id: id },
      order: { createdAt: 'ASC' },
    });

    return {
      code: 200,
      message: 'success',
      time: Date(),
      result: {
        title: main.title,
        description: main.description,
        list,
      },
    };
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
