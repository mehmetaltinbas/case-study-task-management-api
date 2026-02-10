export function isValidTimeFormat(value: string | undefined): string | number {
    if (!value || !(/^\d+[smhd]?$/.test(value))) {
        return '24h';
    }

    return value;
};
