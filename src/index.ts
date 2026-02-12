import { specs, swaggerUi } from '@/swagger.js';
import { loadControllers } from '@/utils/load-controllers.util.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import './keep-alive.js';

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

void (async (): Promise<void> => {
    await loadControllers(app);

    app.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
})();
