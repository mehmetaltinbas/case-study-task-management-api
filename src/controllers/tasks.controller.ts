import { TasksService } from '@/services/tasks.service';
import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
    const response = await TasksService.create();
    res.json(response);
});

router.get('/', async (req, res) => {
    const response = await TasksService.readAll();
    res.json(response);
});

export default router;
