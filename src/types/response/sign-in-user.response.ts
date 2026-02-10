import { ResponseBase } from '@/types/response/response-base.response';

export interface SignInUserResponse extends ResponseBase {
    jwt?: string;
}
