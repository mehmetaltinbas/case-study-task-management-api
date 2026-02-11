import { User } from '@/generated/prisma/client';
import { ResponseBase } from '@/types/response/response-base.response';

export interface ReadSingleUserResponse extends ResponseBase {
    user?: User;
}
