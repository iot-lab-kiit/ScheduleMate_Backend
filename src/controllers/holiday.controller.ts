import { Request, Response } from "express";
import { HolidayService } from "../services";
import { MethodBinder } from "../utils";

export class HolidayController {
  private holidayService: HolidayService;

  constructor() {
    this.holidayService = new HolidayService();
    MethodBinder.bind(this);
  }

  async addHoliday(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.holidayService.addholiday();
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
