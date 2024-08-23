import { IsArray, IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsArray()
  elective_section: string[];

  @IsNotEmpty()
  @IsUrl()
  photoUrl: string;

  @IsNotEmpty()
  @IsString()
  section: string;
}
