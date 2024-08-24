import { Days } from '@prisma/client';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateElectiveDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  room?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(12)
  startTime?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(12)
  endTime?: number;

  @IsOptional()
  @IsString()
  section?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  days?: Days[];
}
