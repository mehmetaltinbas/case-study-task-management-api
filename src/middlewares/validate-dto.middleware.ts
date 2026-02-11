import { ResponseBase } from '@/types/response/response-base.response';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export function validateDto(dtoClass: any) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const dtoInstance = plainToClass(dtoClass, req.body);

        const errors: ValidationError[] = await validate(dtoInstance, {
            whitelist: true
        } as ValidatorOptions);

        if (errors.length > 0) {
            const formattedErrors = errors.map(error => ({
                field: error.property,
                errors: Object.values(error.constraints || {}),
            }));

            const errorMessage = formattedErrors
                .map(error => `${error.field}: \n${error.errors.map(e => `* ${e}`).join('\n')}`)
                .join('\n');

            const response: ResponseBase = {
                isSuccess: false,
                message: `input validation failed, problematic fields: \n${errorMessage}`,
                statusCode: 400
            };
            res.status(response.statusCode).json(response);
            return;
        }

        req.body = dtoInstance;
        next();
    };
}
