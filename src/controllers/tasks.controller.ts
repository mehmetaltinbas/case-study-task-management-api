import { authorizationMiddleware } from '@/middlewares/auth.middleware';
import { validateDto } from '@/middlewares/validate-dto.middleware';
import { TasksService } from '@/services/tasks.service';
import { CreateTaskDto } from '@/types/dto/tasks/create-task.dto';
import { UpdateTaskDto } from '@/types/dto/tasks/update-task.dto';
import express from 'express';

const router = express.Router();

router.post('/', authorizationMiddleware, validateDto(CreateTaskDto), async (req, res) => {
    const userId = req.userId!;

    const dto: CreateTaskDto = req.body;

    const response = await TasksService.create(userId, dto);

    res.status(response.statusCode).json(response);
});

router.get('/', authorizationMiddleware, async (req, res) => {
    const userId = req.userId!;

    const response = await TasksService.readAllByUserId(userId);

    res.status(response.statusCode).json(response);
});

router.patch('/:id', authorizationMiddleware, validateDto(UpdateTaskDto), async (req, res) => {
    const userId = req.userId!;

    const id = req.params.id;

    const dto: UpdateTaskDto = req.body;

    const response = await TasksService.updateById(userId, id, dto);

    res.status(response.statusCode).json(response);
});

router.delete('/:id', authorizationMiddleware, async (req, res) => {
    const userId = req.userId!;

    const id = req.params.id;

    const response = await TasksService.deleteById(userId, id);

    res.status(response.statusCode).json(response);
});

export default router;
