import { validateDto } from '@/middlewares/src/middlewares/validate-dto.middleware';
import { TasksService } from '@/services/tasks.service';
import { CreateClassDto } from '@/types/dto/tasks/create-task.dto';
import express from 'express';

const router = express.Router();

router.post('/', validateDto(CreateClassDto), async (req, res) => {
    const userId = '';

    const dto: CreateClassDto = req.body;

    const response = await TasksService.create(userId, dto);

    res.status(response.statusCode).json(response);
});

router.get('/', async (req, res) => {
    const userId = '';

    const response = await TasksService.readAllByUserId(userId);

    res.status(response.statusCode).json(response);
});

export default router;
