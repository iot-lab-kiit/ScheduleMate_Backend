import { Request, Response } from "express";
import { ScheduleService } from "../services";
import { MethodBinder } from "../utils";
import { plainToInstance } from "class-transformer";
import { ScheduleDto } from "../common/dtos";

export class ScheduleController {
  private scheduleService: ScheduleService;

  constructor() {
    this.scheduleService = new ScheduleService();
    MethodBinder.bind(this);
  }

  async addSchedule(req: Request, res: Response): Promise<void> {
    try {
      const dto = plainToInstance(ScheduleDto, req.body);
      const result = await this.scheduleService.addSchedule(dto);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  }
}
