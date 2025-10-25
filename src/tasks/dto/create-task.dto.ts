import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  isCompleted: boolean;

  @IsInt()
  userId: number;
}
