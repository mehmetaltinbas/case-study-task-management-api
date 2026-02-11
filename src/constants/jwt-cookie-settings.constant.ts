import { parseJwtExpiresIn } from '@/utils/is-valid-jwt-expires-in-format';

const parsed = parseJwtExpiresIn(process.env.JWT_EXPIRES_IN);

export const jwtCookieSettings = {
    name: 'jwt',
    secret: process.env.JWT_SECRET ?? 'jwt-secret',
    expiresIn: parsed.expiresIn,
    maxAge: parsed.maxAge,
    isSecure: process.env.NODE_ENV === 'production' ? true : false,
    isHttpOnly: true,
    sameSite: 'lax' as 'lax' | 'strict' | 'none',
};
