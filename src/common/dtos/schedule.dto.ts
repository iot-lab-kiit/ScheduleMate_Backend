import { IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class ScheduleDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(8)
  semester: number;
}
