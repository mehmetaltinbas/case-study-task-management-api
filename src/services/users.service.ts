import { jwtCookieSettings } from '@/constants/jwt-cookie-settings.constant';
import { SignInUserDto } from '@/types/dto/users/sign-in-user.dto';
import { SignUpUserDto } from '@/types/dto/users/sign-up-user.dto';
import { ResponseBase } from '@/types/response/response-base.response';
import { SignInUserResponse } from '@/types/response/sign-in-user.response';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { prisma } from 'prisma/prisma-client';

export class UsersService {
    private constructor() {}

    static async signUp(dto: SignUpUserDto): Promise<ResponseBase> {
        const { password, ...dtoWithoutPassword } = dto;

        const passwordHash = bcrypt.hashSync(dto.password, 10);

        try {
            await prisma.user.create({
                data: {
                    ...dtoWithoutPassword,
                    passwordHash
                }
            });
            return { isSuccess: true, message: 'signed up', statusCode: 200 };
        } catch (error) {
            console.error(error);
            return { isSuccess: false, message: 'internal server error', statusCode: 500 };
        }
    }

    static async signIn(dto: SignInUserDto): Promise<SignInUserResponse> {
        try {
            const user = await prisma.user.findUnique({
                where: { userName: dto.userName }
            });

            if (!user) {
                return { isSuccess: false, message: 'no user found by given userName', statusCode: 401 };
            }

            const isPasswordValid = bcrypt.compareSync(dto.password, user.passwordHash);

            if (!isPasswordValid) {
                return { isSuccess: false, message: 'invalid password', statusCode: 401 };
            }

            const jwt = jsonwebtoken.sign(
                { id: user.id, userName: user.userName },
                jwtCookieSettings.secret,
                { expiresIn: jwtCookieSettings.expiresIn as any }
            );

            return { isSuccess: true, message: 'signed in', statusCode: 200, jwt };
        } catch (error) {
            console.error(error);
            return { isSuccess: false, message: 'internal server error', statusCode: 500 };
        }
    }
}
