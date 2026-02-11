import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateTaskDto {
    @MinLength(2)
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsBoolean()
    @IsNotEmpty()
    isCompleted: boolean;
}
