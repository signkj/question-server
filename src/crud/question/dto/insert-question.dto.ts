import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsEmail,
} from 'class-validator';

export class WriteMyDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @IsNotEmpty()
  @IsString()
  answer: string;
}

export class WriteQuestionDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @IsArray()
  questions: WriteMyDto[];
}
