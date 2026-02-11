import dotenv from 'dotenv';
import http from 'http';
import https from 'https';

dotenv.config();

const protocol = process.env.NODE_ENV === 'production' ? https : http;

setInterval(
    () => {
        protocol
            .get(`${process.env.API_URL}/keep-alive`, (res) => {
                if (res.statusCode === 200) {
                    console.log(`[keep-alive] success: API is alive at ${new Date().toISOString()}`);
                } else {
                    console.log(
                        `[keep-alive] failed: API returned status ${res.statusCode} at ${new Date().toISOString()}`
                    );
                }
            })
            .on('error', (e) => {
                console.error(`[keep-alive] error: ${e} at ${new Date().toISOString()}`);
            });
    },
    12 * 60 * 1000
);
