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

/**
 * @swagger
 * /users/sign-up:
 *   post:
 *     summary: sign up a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *                 minLength: 2
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: user signed up successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 statusCode:
 *                   type: integer
 *       409:
 *         description: userName already exists
 *       500:
 *         description: internal server error
 */
router.post('/sign-up', validateDto(SignUpUserDto), async (req, res) => {
    const dto: SignUpUserDto = req.body;

    const response = await UsersService.signUp(dto);

    res.status(response.statusCode).json(response);
});

/**
 * @swagger
 * /users/sign-in:
 *   post:
 *     summary: sign in
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *                 minLength: 2
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: user signed in successfully, JWT set in cookie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 statusCode:
 *                   type: integer
 *       401:
 *         description: invalid credentials
 *       500:
 *         description: internal server error
 */
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

/**
 * @swagger
 * /users:
 *   patch:
 *     summary: update current user
 *     tags:
 *       - Users
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 minLength: 2
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: user updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 statusCode:
 *                   type: integer
 *       401:
 *         description: unauthorized
 *       404:
 *         description: user not found
 *       409:
 *         description: username already exists
 *       500:
 *         description: internal server error
 */
router.patch('/', authorizationMiddleware, validateDto(UpdateUserDto), async (req, res) => {
    const userId = req.userId!;

    const dto: UpdateUserDto = req.body;

    const response = await UsersService.updateById(userId, dto);

    res.status(response.statusCode).json(response);
});

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: delete current user
 *     tags:
 *       - Users
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: user deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 statusCode:
 *                   type: integer
 *       401:
 *         description: unauthorized
 *       404:
 *         description: user not found
 *       500:
 *         description: internal server error
 */
router.delete('/', authorizationMiddleware, async (req, res) => {
    const userId = req.userId!;

    const response = await UsersService.deleteById(userId);

    res.status(response.statusCode).json(response);
});

export default router;
