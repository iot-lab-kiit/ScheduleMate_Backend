import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { CreateElectiveDto } from './createElective.dto';
import { Type } from 'class-transformer';
import 'reflect-metadata';

export class CreateElectiveArrayDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateElectiveDto)
  electives: CreateElectiveDto[];
}
