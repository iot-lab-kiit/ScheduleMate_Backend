import {IsArray, IsEmail, IsInt, IsJSON, IsNotEmpty, IsString, IsUrl, Max, Min} from "class-validator";

export class UserDto {

  id?: string;
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
