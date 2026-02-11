import { CreateTaskDto } from '@/types/dto/tasks/create-task.dto';
import { UpdateTaskDto } from '@/types/dto/tasks/update-task.dto';
import { ResponseBase } from '@/types/response/response-base.response';
import { ReadMultipleTasksResponse } from '@/types/response/tasks/read-multiple-tasks.response';
import { prisma } from 'prisma/prisma-client';

export class TasksService {
    private constructor() {}

    static async create(userId: string, dto: CreateTaskDto): Promise<ResponseBase> {
        try {
            const duplicateTask = await prisma.task.findFirst({
                where: {
                    userId,
                    title: dto.title,
                },
            });

            if (duplicateTask) {
                return {
                    isSuccess: false,
                    message: `a task with given title ${dto.title} already exists`,
                    statusCode: 409,
                };
            }

            await prisma.task.create({
                data: {
                    userId,
                    ...dto,
                },
            });

            return { isSuccess: true, message: 'task created', statusCode: 201 };
        } catch (error) {
            console.error(error);
            return { isSuccess: false, message: 'internal server error', statusCode: 500 };
        }
    }

    static async readAllByUserId(userId: string): Promise<ReadMultipleTasksResponse> {
        try {
            const tasks = await prisma.task.findMany({
                where: {
                    userId,
                },
            });

            if (tasks.length === 0) {
                return {
                    isSuccess: true,
                    message: 'no tasks found for this user',
                    statusCode: 200,
                    tasks,
                };
            }

            return {
                isSuccess: true,
                message: 'all tasks read by given userId',
                statusCode: 200,
                tasks,
            };
        } catch (error) {
            console.error(error);
            return { isSuccess: false, message: 'internal server error', statusCode: 500 };
        }
    }

    static async updateById(userId: string, id: string, dto: UpdateTaskDto): Promise<ResponseBase> {
        try {
            const existingTask = await prisma.task.findFirst({
                where: {
                    id,
                    userId,
                },
            });

            if (!existingTask) {
                return {
                    isSuccess: false,
                    message: 'task not found',
                    statusCode: 404,
                };
            }

            if (dto.title) {
                const duplicateTask = await prisma.task.findFirst({
                    where: {
                        userId,
                        title: dto.title,
                        NOT: {
                            id,
                        },
                    },
                });

                if (duplicateTask) {
                    return {
                        isSuccess: false,
                        message: `a task with title ${dto.title} already exists`,
                        statusCode: 409,
                    };
                }
            }

            await prisma.task.update({
                where: {
                    id,
                },
                data: dto,
            });

            return {
                isSuccess: true,
                message: 'task updated',
                statusCode: 200,
            };
        } catch (error) {
            console.error(error);
            return {
                isSuccess: false,
                message: 'internal server error',
                statusCode: 500,
            };
        }
    }

    static async deleteById(userId: string, id: string): Promise<ResponseBase> {
        try {
            const existingTask = await prisma.task.findFirst({
                where: {
                    id,
                    userId
                }
            });

            if (!existingTask) {
                return {
                    isSuccess: false,
                    message: 'task not found',
                    statusCode: 404
                };
            }

            await prisma.task.delete({
                where: {
                    id
                }
            });

            return {
                isSuccess: true,
                message: 'task deleted',
                statusCode: 200
            };
        } catch (error) {
            console.error(error);
            return {
                isSuccess: false,
                message: 'internal server error',
                statusCode: 500
            };
        }
    }
}
