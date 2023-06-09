import { plainToInstance, Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateQuestionRequestDto } from '@/survey/dto/create-question-request.dto';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { SurveyType } from '@/common/constant/enum';
import { CreateABQuestionRequestDto } from '@/survey/dto/create-abquestion-request.dto';
import { validateSync } from 'class-validator';
import { IsDefined } from 'class-validator';

export class CreateSurveyRequestDto {
  @ApiProperty({
    enum: SurveyType,
  })
  @IsEnum(SurveyType)
  @IsNotEmpty()
  type: SurveyType;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: 'array',
    items: {
      oneOf: [
        {
          $ref: getSchemaPath(CreateABQuestionRequestDto),
        },
        {
          $ref: getSchemaPath(CreateQuestionRequestDto),
        },
      ],
    },
  })
  @IsArray()
  @IsDefined()
  @ValidateNested({ each: true })
  @Transform(({ value }) =>
    validateSync(plainToInstance(CreateABQuestionRequestDto, value[0]))
      .length === 0
      ? plainToInstance(CreateABQuestionRequestDto, value)
      : plainToInstance(CreateQuestionRequestDto, value),
  )
  questions: any;
  // questions: Question[] | ABQuestion[];
  // TODO: 해당 타입 지정 시 questions 넘어오지 않음 -> 확인 후 해결 필요

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  constructor(
    type: SurveyType,
    title: string,
    questions: any,
    description?: string,
  ) {
    this.type = type;
    this.title = title;
    this.questions = questions;
    this.description = description;
  }
}
