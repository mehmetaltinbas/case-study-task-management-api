import { TaskService } from '@/services/task.service';
import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
    const response = await TaskService.create();
    res.json(response);
});

router.get('/', async (req, res) => {
    const response = await TaskService.readAll();
    res.json(response);
});

export default router;
