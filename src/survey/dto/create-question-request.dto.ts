import { CreateSelectionRequestDto } from '@/survey/dto/create-selection-request.dto';
import { QuestionType } from '@/common/constant/enum';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionRequestDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ enum: QuestionType })
  @IsString()
  @IsNotEmpty()
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiProperty({ isArray: true, type: CreateSelectionRequestDto })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateSelectionRequestDto)
  selections?: Selection[];

  constructor(title: string, type: QuestionType, selections?: Selection[]) {
    this.title = title;
    this.type = type;
    this.selections = selections;
  }
}
