import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Question,
  QuestionMain,
  QuestionOption,
  QuestionRecv,
} from 'src/packet/question.entity';
import { Repository } from 'typeorm';
import { WriteQuestionDto } from './dto/insert-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionMain)
    private readonly repoQuestionMain: Repository<QuestionMain>,
    @InjectRepository(Question)
    private readonly repoQuestion: Repository<Question>,
    @InjectRepository(QuestionOption)
    private readonly repoQuestionOption: Repository<QuestionOption>,
    @InjectRepository(QuestionRecv)
    private readonly repoQuestionRecv: Repository<QuestionRecv>,
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
      const subQuestion = await this.repoQuestion.save(newQ);

      q.option.split(',').forEach(async (item) => {
        const newO = this.repoQuestionOption.create({
          ques_id: subQuestion.id,
          name: item,
        });
        await this.repoQuestionOption.save(newO);
      });
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

    const list = await this.repoQuestion
      .createQueryBuilder('p')
      .select([
        'p.id as id',
        'p.type as type',
        'p.title as title',
        'p.optionyn as optionyn',
      ])
      .where('p.qmain_id = :id', { id })
      .orderBy('p.id', 'ASC')
      .getRawMany()
      .then(async (result) => {
        return Promise.all(
          result.map(async (item) => {
            const options = await this.repoQuestionOption.find({
              select: ['id', 'name'],
              where: { ques_id: item.id },
              order: { id: 'ASC' },
            });
            const namelist = options.map((item) => item.name.trim()).join(',');
            return {
              ...item,
              option: namelist,
            };
          }),
        );
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

  async writeQuestion(id: number, dto: WriteQuestionDto) {
    if (dto.questions.length <= 0) {
      return {
        code: 400,
        message: 'bad request',
        time: Date(),
        result: null,
      };
    }

    const isCheked = await this.repoQuestionRecv.findOneBy({
      ques_id: id,
      email: dto.email,
    });

    if (isCheked !== null) {
      return {
        code: 400,
        message: 'already exist',
        time: Date(),
      };
    }

    dto.questions.forEach(async (q) => {
      const newQ = this.repoQuestionRecv.create({
        ques_id: id,
        ques_sub_id: q.id,
        email: dto.email,
        answer: q.answer,
      });
      await this.repoQuestionRecv.save(newQ);

      this.repoQuestionOption.findOneBy({ ques_id: q.id }).then((result) => {
        result.name === q.answer ? (result.choice += 1) : (result.choice += 0);
        this.repoQuestionOption.save(result);
      });
    });

    return {
      code: 200,
      message: 'success',
      time: Date(),
    };
  }

  async getResult(id: number) {
    // const data = await this.repoQuestionRecv
    //   .createQueryBuilder('p')
    //   .innerJoinAndMapOne('p.id', ShareItem, 'pt', 'p.id = pt.item_id')
    //   .select([
    //     'p.id as id',
    //     'p.type as type',
    //     'p.path as path',
    //     'p.size as size',
    //     'p.node_name as node_name',
    //     'p.name as name',
    //   ])
    //   .where('p.useyn = true')
    //   .andWhere('pt.url = :url', { url })
    //   .orderBy('pt.id', 'ASC')
    //   .getRawMany();
    // const member = await this.repoQuestionRecv
    //   .createQueryBuilder()
    //   .distinct(true)
    //   .select('mycode')
    //   .groupBy('mycode')
    //   .getRawMany()
    //   .then((result) => {
    //     return result.map((item) => {
    //       if (item.mycode !== '') {
    //         info.push(item.mycode);
    //       }
    //     });
    //   });
    // const list = await this.repoQuestionRecv.find({
    //   select: ['id', 'answer'],
    //   where: { ques_id: id },
    //   order: { createdAt: 'ASC' },
    // });
    // return {
    //   code: 200,
    //   message: 'success',
    //   time: Date(),
    //   result: {
    //     list,
    //   },
    // };
  }

  async getStatistic(id: number) {
    const list = await this.repoQuestionRecv.find({
      select: ['id', 'answer'],
      where: { ques_id: id },
      order: { createdAt: 'ASC' },
    });

    return {
      code: 200,
      message: 'success',
      time: Date(),
      result: {
        list,
      },
    };
  }
}
