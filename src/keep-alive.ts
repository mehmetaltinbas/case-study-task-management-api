import dotenv from 'dotenv';

dotenv.config();

const API_URL = process.env.API_URL;

if (!API_URL) {
    console.warn('[keep-alive] No API_URL found in environment variables.');
} else {
    setInterval(async () => {
        try {
            const response = await fetch(`${API_URL}/keep-alive`);

            const timestamp = new Date().toISOString();

            if (response.ok) {
                console.log(`[keep-alive] success: API is alive at ${timestamp}`);
            } else {
                console.log(`[keep-alive] failed: status ${response.status} at ${timestamp}`);
            }
        } catch (e) {
            console.error(`[keep-alive] error: ${e instanceof Error ? e.message : e} at ${new Date().toISOString()}`);
        }
    }, 12 * 60 * 1000);
}
