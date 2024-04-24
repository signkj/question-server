import { Column, Entity } from 'typeorm';
import { BaseAutoEntity } from './entity/baseAuto.entity';

@Entity('question_main')
export class QuestionMain extends BaseAutoEntity {
  @Column({ default: '', comment: '설문지제목' })
  title: string;
  @Column({ default: '', comment: '설명' })
  description: string;
  @Column({ default: 0, comment: '질문수량' })
  ques_cnt: number;
  @Column({ default: 0, comment: '생성자' })
  maker: string;
}

@Entity('question')
export class Question extends BaseAutoEntity {
  @Column({ default: 0, comment: 'id' })
  qmain_id: number;
  @Column({ default: 1, comment: '1.단답형, 2.객관식, 3.체크박스' })
  type: number;
  @Column({ default: '', comment: '설문지제목' })
  title: string;
  @Column({ default: false, comment: '필수선택유무' })
  optionyn: boolean;
}

@Entity('question_option')
export class QuestionOption extends BaseAutoEntity {
  @Column({ default: 0, comment: 'id' })
  ques_id: number;
  @Column({ default: '', comment: '옵션이름' })
  name: string;
}
