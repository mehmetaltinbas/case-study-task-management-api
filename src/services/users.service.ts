import { jwtCookieSettings } from '@/constants/jwt-cookie-settings.constant';
import { SignInUserDto } from '@/types/dto/users/sign-in-user.dto';
import { SignUpUserDto } from '@/types/dto/users/sign-up-user.dto';
import { UpdateUserDto } from '@/types/dto/users/update-user.dto';
import { DecodedJwtPayload } from '@/types/jwt-payload.interface';
import { ResponseBase } from '@/types/response/response-base.response';
import { SignInUserResponse } from '@/types/response/sign-in-user.response';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { prisma } from 'prisma/prisma-client';

export class UsersService {
    private constructor() {}

    static async signUp(dto: SignUpUserDto): Promise<ResponseBase> {
        const { password, ...restOfDto } = dto;

        try {
            const duplicateUser = await prisma.user.findFirst({
                where: {
                    userName: restOfDto.userName
                },
            });

            if (duplicateUser) {
                return {
                    isSuccess: false,
                    message: `an user with given userName ${dto.userName} already exists`,
                    statusCode: 409,
                };
            }

            const passwordHash = bcrypt.hashSync(dto.password, 10);

            await prisma.user.create({
                data: {
                    ...restOfDto,
                    passwordHash,
                },
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
                where: { userName: dto.userName },
            });

            if (!user) {
                return {
                    isSuccess: false,
                    message: 'no user found by given userName',
                    statusCode: 401,
                };
            }

            const isPasswordValid = bcrypt.compareSync(dto.password, user.passwordHash);

            if (!isPasswordValid) {
                return { isSuccess: false, message: 'invalid password', statusCode: 401 };
            }

            const jwt = jsonwebtoken.sign(
                { userId: user.id, userName: user.userName } as DecodedJwtPayload,
                jwtCookieSettings.secret,
                { expiresIn: jwtCookieSettings.expiresIn as any }
            );

            return { isSuccess: true, message: 'signed in', statusCode: 200, jwt };
        } catch (error) {
            console.error(error);
            return { isSuccess: false, message: 'internal server error', statusCode: 500 };
        }
    }

    static async updateById(id: string, dto: UpdateUserDto): Promise<ResponseBase> {
        try {
            const existingUser = await prisma.user.findUnique({
                where: { id }
            });

            if (!existingUser) {
                return {
                    isSuccess: false,
                    message: 'user not found',
                    statusCode: 404
                };
            }

            if (dto.userName) {
                const duplicateUser = await prisma.user.findFirst({
                    where: {
                        userName: dto.userName,
                        NOT: { id }
                    }
                });

                if (duplicateUser) {
                    return {
                        isSuccess: false,
                        message: `userName ${dto.userName} already exists`,
                        statusCode: 409
                    };
                }
            }

            const { password, ...restOfDto} = dto;

            let passwordHash = '';

            if (password) {
                passwordHash = bcrypt.hashSync(dto.password, 10);
            }

            await prisma.user.update({
                where: { id },
                data: {
                    ...restOfDto,
                    ...(passwordHash.length !== 0 && { passwordHash }),
                }
            });

            return {
                isSuccess: true,
                message: 'user updated',
                statusCode: 200
            };
        } catch (error) {
            console.error(error);
            return {
                isSuccess: false,
                message: 'internal server error',
                statusCode: 500
            };
        }
    }

    static async deleteById(id: string): Promise<ResponseBase> {
        try {
            const existingUser = await prisma.user.findUnique({
                where: { id }
            });

            if (!existingUser) {
                return {
                    isSuccess: false,
                    message: 'user not found',
                    statusCode: 404
                };
            }

            await prisma.user.delete({
                where: { id }
            });

            return {
                isSuccess: true,
                message: 'user deleted',
                statusCode: 200
            };
        } catch (error) {
            console.error(error);
            return {
                isSuccess: false,
                message: 'internal server error',
                statusCode: 500
            };
        }
    }
}
