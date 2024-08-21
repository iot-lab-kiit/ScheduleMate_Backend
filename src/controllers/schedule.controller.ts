import { Request, Response } from "express";
import { ScheduleService } from "../services";
import { MethodBinder } from "../utils";

export class ScheduleController {
  private scheduleService: ScheduleService;

  constructor() {
    this.scheduleService = new ScheduleService();
    MethodBinder.bind(this);
  }

  async addSchedule(req: Request, res: Response): Promise<void> {
    try {
      const { semester } = req.body;
      const result = await this.scheduleService.addSchedule(semester);
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
