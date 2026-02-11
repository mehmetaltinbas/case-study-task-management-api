import { Task } from '@/generated/prisma/client';
import { ResponseBase } from '@/types/response/response-base.response';

export interface ReadMultipleTasksResponse extends ResponseBase {
    tasks?: Task[];
}
