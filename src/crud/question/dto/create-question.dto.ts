import {
  IsString,
  IsNotEmpty,
  Length,
  IsArray,
  IsNumber,
  IsBoolean,
  IsEmail,
} from 'class-validator';

export class QuestionDto {
  @IsNotEmpty()
  @IsNumber()
  type: number;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  option: string;
  @IsNotEmpty()
  @IsBoolean()
  optionyn: boolean;
}

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  @Length(50)
  title: string;
  @IsString()
  @Length(100)
  description: string;
  @IsEmail()
  email: string;
  @IsArray()
  questions: QuestionDto[];
}
