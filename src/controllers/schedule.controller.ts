import { NextFunction, Request, Response } from 'express';
import { ScheduleService } from '../services';
import { MethodBinder } from '../utils';
import { plainToInstance } from 'class-transformer';
import { ScheduleDto } from '../common/dtos';

export class ScheduleController {
  private scheduleService: ScheduleService;

  constructor() {
    this.scheduleService = new ScheduleService();
    MethodBinder.bind(this);
  }

  async addSchedule(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dto = plainToInstance(ScheduleDto, req.body);
      const result = await this.scheduleService.addSchedule(dto as ScheduleDto);
      res.status(201).json(result);
    } catch (error) {
      console.error('error');
      next(error);
    }
  }
}
