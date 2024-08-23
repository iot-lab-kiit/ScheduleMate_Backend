import { validateOrReject, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { MethodBinder } from '../utils';

export class ValidationMiddleware {
  private dtoClass: any;

  constructor(DtoClass: any) {
    MethodBinder.bind(this);
    this.dtoClass = DtoClass;
  }

  async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(this.dtoClass, req.body);
      await validateOrReject(dto, { whitelist: true });
      req.body = dto;
      next();
    } catch (errors: any) {
      const errorMessages = errors.map((error: ValidationError) => ({
        property: error.property,
        constraints: error.constraints,
      }));
      res.status(400).json({
        success: false,
        message: 'Bad request exception',
        errors: errorMessages,
      });
    }
  }
}
