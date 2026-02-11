import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
// import './keepalive.js';

dotenv.config();

const app = express();
const port = 3000;

app.use(
    cors({
        origin: `${process.env.UI_URL}`,
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

async function loadControllers(): Promise<void> {
    const controllers = fs.readdirSync('./src/controllers');
    console.log('\nloading controllers...');
    for (const controller of controllers) {
        const route = controller.replace('.controller.ts', '').toLocaleLowerCase();
        await import(`./controllers/${controller.replace('.ts', '.js')}`)
            .then((controller) => {
                app.use(`/${route}`, controller.default);
                console.log(`loaded controller: ${route}`);
            })
            .catch((err) => console.error(`\n\tError loading the controller ${controller}\n`, err));
    }
    console.log('');
}

void (async (): Promise<void> => {
    await loadControllers();
    app.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
})();
