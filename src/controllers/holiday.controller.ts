import { NextFunction, Request, Response } from 'express';
import { HolidayService } from '../services';
import { MethodBinder } from '../utils';

export class HolidayController {
  private holidayService: HolidayService;

  constructor() {
    this.holidayService = new HolidayService();
    MethodBinder.bind(this);
  }

  async addHoliday(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await this.holidayService.addHoliday();
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
