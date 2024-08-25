import { Days } from '@prisma/client';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateElectiveDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  room: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(12)
  startTime: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(12)
  endTime: number;

  @IsNotEmpty()
  @IsString()
  section: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  days: Days[];
}
