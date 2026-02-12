import { TasksService } from '@/services/tasks.service';
import { CreateTaskDto } from '@/types/dto/tasks/create-task.dto';
import { prisma } from '../../../prisma/prisma-client';

describe('TasksService', () => {
    let userId: string;

    beforeEach(async () => {
        const user = await prisma.user.create({
            data: {
                userName: 'userName',
                passwordHash: 'hashedPassword',
            },
        });

        userId = user.id;
    });

    describe('create', () => {
        it('should create a task successfully', async () => {
            const dto: CreateTaskDto = {
                title: 'Test Task',
                isCompleted: false,
            };

            const result = await TasksService.create(userId, dto);

            expect(result.statusCode).toBe(201);
            expect(result.isSuccess).toBe(true);
            expect(result.message).toBe('task created');
        });

        it('should return 409 due to the duplicate title', async () => {
            const dto: CreateTaskDto = {
                title: 'Test Task',
                isCompleted: false,
            };

            await TasksService.create(userId, dto);

            const result = await TasksService.create(userId, dto);

            expect(result.statusCode).toBe(409);
            expect(result.isSuccess).toBe(false);
            expect(result.message).toBe(`a task with given title ${dto.title} already exists`);
        });
    });

    describe('readAllByUserId', () => {
        it('should return all tasks for the user', async () => {
            const task1 = await prisma.task.create({
                data: {
                    userId,
                    title: 'First Task',
                    isCompleted: false,
                }
            });

            const task2 = await prisma.task.create({
                data: {
                    userId,
                    title: 'Second Task',
                    isCompleted: false,
                }
            });

            const result = await TasksService.readAllByUserId(userId);

            expect(result.statusCode).toBe(200);
            expect(result.isSuccess).toBe(true);
            expect(result.message).toBe('all tasks read by given userId');
            expect(result.tasks).toHaveLength(2);
            expect(result.tasks![0].title).toBe(task1.title);
            expect(result.tasks![1].title).toBe(task2.title);
        });

        it('should return empty array when user has no tasks', async () => {
            const result = await TasksService.readAllByUserId(userId);

            expect(result.statusCode).toBe(200);
            expect(result.isSuccess).toBe(true);
            expect(result.message).toBe('no tasks found for this user');
            expect(result.tasks).toHaveLength(0);
        });
    });
});
