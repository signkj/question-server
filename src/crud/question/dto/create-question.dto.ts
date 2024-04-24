import { IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  title: string;
}
