import { ResponseBase } from '@/types/response/response-base.response';

export class UserService {
    private constructor() {}

    static async signUp(): Promise<ResponseBase> {
        return { isSuccess: true, message: 'successfull' };
    }
}
