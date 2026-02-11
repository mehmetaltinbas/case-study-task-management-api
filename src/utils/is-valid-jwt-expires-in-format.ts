export function parseJwtExpiresIn(value: string | undefined): {
    expiresIn: string;
    maxAge: number;
} {
    const defaultValue = '24h';
    const validated = value && /^\d+[smhd]$/.test(value) ? value : defaultValue;

    const match = validated.match(/^(\d+)([smhd])$/);
    let milliseconds: number;

    if (match) {
        const [, num, unit] = match;
        const numValue = parseInt(num);

        switch (unit) {
            case 's':
                milliseconds = numValue * 1000;
                break;
            case 'm':
                milliseconds = numValue * 60 * 1000;
                break;
            case 'h':
                milliseconds = numValue * 60 * 60 * 1000;
                break;
            case 'd':
                milliseconds = numValue * 24 * 60 * 60 * 1000;
                break;
            default:
                milliseconds = 24 * 60 * 60 * 1000;
        }
    } else {
        milliseconds = 24 * 60 * 60 * 1000;
    }

    return {
        expiresIn: validated,
        maxAge: milliseconds,
    };
}
