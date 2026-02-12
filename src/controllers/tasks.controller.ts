import { authorizationMiddleware } from '@/middlewares/authorization.middleware';
import { validateDto } from '@/middlewares/validate-dto.middleware';
import { TasksService } from '@/services/tasks.service';
import { CreateTaskDto } from '@/types/dto/tasks/create-task.dto';
import { UpdateTaskDto } from '@/types/dto/tasks/update-task.dto';
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: create a new task
 *     tags:
 *       - Tasks
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - isCompleted
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 2
 *               isCompleted:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 statusCode:
 *                   type: integer
 *       401:
 *         description: unauthorized
 *       409:
 *         description: task with given title already exists
 *       500:
 *         description: internal server error
 */
router.post('/', authorizationMiddleware, validateDto(CreateTaskDto), async (req, res) => {
    const userId = req.userId!;

    const dto: CreateTaskDto = req.body;

    const response = await TasksService.create(userId, dto);

    res.status(response.statusCode).json(response);
});

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: get all tasks for current user
 *     tags:
 *       - Tasks
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 statusCode:
 *                   type: integer
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       userId:
 *                         type: string
 *                       title:
 *                         type: string
 *                       isCompleted:
 *                         type: boolean
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: unauthorized
 *       500:
 *         description: internal server error
 */
router.get('/', authorizationMiddleware, async (req, res) => {
    const userId = req.userId!;

    const response = await TasksService.readAllByUserId(userId);

    res.status(response.statusCode).json(response);
});

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: update a task by id
 *     tags:
 *       - Tasks
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: task id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 2
 *               isCompleted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 statusCode:
 *                   type: integer
 *      200:
 *          description: no tasks found for this user (if user don't have any task)
 *       401:
 *         description: unauthorized
 *       404:
 *         description: task not found
 *       409:
 *         description: task with given title already exists
 *       500:
 *         description: internal server error
 */
router.patch('/:id', authorizationMiddleware, validateDto(UpdateTaskDto), async (req, res) => {
    const userId = req.userId!;

    const id = req.params.id;

    const dto: UpdateTaskDto = req.body;

    const response = await TasksService.updateById(userId, id, dto);

    res.status(response.statusCode).json(response);
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: delete a task by id
 *     tags:
 *       - Tasks
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: task id
 *     responses:
 *       200:
 *         description: task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 statusCode:
 *                   type: integer
 *       401:
 *         description: unauthorized
 *       404:
 *         description: task not found
 *       500:
 *         description: internal server error
 */
router.delete('/:id', authorizationMiddleware, async (req, res) => {
    const userId = req.userId!;

    const id = req.params.id;

    const response = await TasksService.deleteById(userId, id);

    res.status(response.statusCode).json(response);
});

export default router;
