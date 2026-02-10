import { ResponseBase } from '@/types/response/response-base.response';

export class TaskService {
    private constructor() {}

    static async create(): Promise<ResponseBase> {
        return { isSuccess: true, message: 'successfull' };
    }

    static async readAll(): Promise<ResponseBase> {
        return { isSuccess: true, message: 'successfull' };
    }

}
