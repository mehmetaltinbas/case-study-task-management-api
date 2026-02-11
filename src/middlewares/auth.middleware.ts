import { jwtCookieSettings } from '@/constants/jwt-cookie-settings.constant';
import { DecodedJwtPayload } from '@/types/jwt-payload.interface';
import { ResponseBase } from '@/types/response/response-base.response';
import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';

export function authorizationMiddleware(req: Request, res: Response, next: NextFunction): void {
    let token = req.cookies.jwt;

    if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
    }

    if (!token) {
        res.status(401).json({
            isSuccess: false,
            message: 'authentication required, no token provided',
            statusCode: 401
        } as ResponseBase);
        return;
    }

    try {
        const decoded = jsonwebtoken.verify(
            token,
            jwtCookieSettings.secret
        ) as DecodedJwtPayload;
        
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({
            isSuccess: false,
            message: 'invalid or expired token.',
            statusCode: 401
        } as ResponseBase);
        return;
    }
}
