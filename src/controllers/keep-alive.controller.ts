import { ResponseBase } from '@/types/response/response-base.response';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    const response: ResponseBase = {
        isSuccess: true,
        message: 'kept alive',
        statusCode: 200
    };

    res.status(response.statusCode).json(response);
});

export default router;
