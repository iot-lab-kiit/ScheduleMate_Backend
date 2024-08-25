import {
  IS_OBJECT,
  IsArray,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class UpdateUserDto {
  uid: string;

  name: string;

  email: string;

  @IsOptional()
  @IsArray()
  elective_section: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  photoUrl: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  section: string;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(8)
  semester: number;
}
