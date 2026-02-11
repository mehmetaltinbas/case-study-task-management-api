import { jwtCookieSettings } from '@/constants/jwt-cookie-settings.constant';
import { authorizationMiddleware } from '@/middlewares/auth.middleware';
import { validateDto } from '@/middlewares/validate-dto.middleware';
import { UsersService } from '@/services/users.service';
import { SignInUserDto } from '@/types/dto/users/sign-in-user.dto';
import { SignUpUserDto } from '@/types/dto/users/sign-up-user.dto';
import { UpdateUserDto } from '@/types/dto/users/update-user.dto';
import { ResponseBase } from '@/types/response/response-base.response';
import express from 'express';

const router = express.Router();

router.post('/sign-up', validateDto(SignUpUserDto), async (req, res) => {
    const dto: SignUpUserDto = req.body;

    const response = await UsersService.signUp(dto);

    res.status(response.statusCode).json(response);
});

router.post('/sign-in', validateDto(SignInUserDto), async (req, res) => {
    const dto: SignInUserDto = req.body;

    const response = await UsersService.signIn(dto);

    if (!response.isSuccess || !response.jwt) {
        res.status(response.statusCode).json(response);
        return;
    }

    res.cookie(jwtCookieSettings.name, response.jwt, {
        maxAge: jwtCookieSettings.maxAge,
        secure: jwtCookieSettings.isSecure,
        httpOnly: jwtCookieSettings.isHttpOnly,
        sameSite: jwtCookieSettings.sameSite,
    });

    const responseBase: ResponseBase = {
        isSuccess: response.isSuccess,
        message: response.message,
        statusCode: response.statusCode,
    };

    res.status(response.statusCode).json(responseBase);
});

router.patch('/', authorizationMiddleware, validateDto(UpdateUserDto), async (req, res) => {
    const userId = req.userId!;

    const dto: UpdateUserDto = req.body;

    const response = await UsersService.updateById(userId, dto);

    res.status(response.statusCode).json(response);
});

router.delete('/', authorizationMiddleware, async (req, res) => {
    const userId = req.userId!;

    const response = await UsersService.deleteById(userId);

    res.status(response.statusCode).json(response);
});

export default router;
