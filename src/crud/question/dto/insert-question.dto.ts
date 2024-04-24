import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class QuestionNewDto {
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
