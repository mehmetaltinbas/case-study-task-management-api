import { isValidTimeFormat } from '@/utils/is-valid-jwt-expires-in-format';

export const jwtCookieSettings = {
    secret: process.env.JWT_SECRET ?? 'jwt-secret',
    expiresIn: isValidTimeFormat(process.env.JWT_EXPIRES_IN),
    isSecure: process.env.NODE_ENV === 'production' ? true : false,
    isHttpOnly: true,
    sameSite: 'lax' as 'lax' | 'strict' | 'none',
};
