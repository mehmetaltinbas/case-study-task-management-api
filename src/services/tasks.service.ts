import { ResponseBase } from '@/types/response/response-base.response';

export class TasksService {
    private constructor() {}

    static async create(): Promise<ResponseBase> {
        return { isSuccess: true, message: 'successfull', statusCode: 200 };
    }

    static async readAll(): Promise<ResponseBase> {
        return { isSuccess: true, message: 'successfull', statusCode: 200 };
    }

}
