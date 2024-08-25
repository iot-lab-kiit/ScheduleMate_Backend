import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateUserDto {
  uid: string;

  name: string;

  email: string;

  photoUrl: string;

  @IsNotEmpty()
  @IsString()
  section: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(8)
  semester: number;
}
