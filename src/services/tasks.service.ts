import { CreateClassDto } from '@/types/dto/tasks/create-task.dto';
import { ResponseBase } from '@/types/response/response-base.response';
import { ReadMultipleTasksResponse } from '@/types/response/tasks/read-multiple-tasks.response';
import { prisma } from 'prisma/prisma-client';

export class TasksService {
    private constructor() {}

    static async create(userId: string, dto: CreateClassDto): Promise<ResponseBase> {
        try {
            const existingTask = await prisma.task.findFirst({
                where: {
                    userId,
                    title: dto.title
                }
            });

            if (existingTask) {
                return {
                    isSuccess: false,
                    message: `a task with given title ${dto.title} already exists`,
                    statusCode: 409
                };
            }

            await prisma.task.create({
                data: {
                    userId,
                    ...dto
                }
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
                    userId
                }
            });

            if (tasks.length === 0) {
                return { isSuccess: true, message: 'no tasks found for this user', statusCode: 200, tasks };
            } 

            return { isSuccess: true, message: 'all tasks read by given userId', statusCode: 200, tasks };
        } catch (error) {
            console.error(error);
            return { isSuccess: false, message: 'internal server error', statusCode: 500 };
        }
    }

}
