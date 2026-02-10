import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpUserDto {
    @IsString()
    @MinLength(2)
    @IsNotEmpty()
    userName: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;
}
