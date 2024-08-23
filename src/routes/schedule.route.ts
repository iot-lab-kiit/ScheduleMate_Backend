import { Router } from "express";
import { ScheduleController } from "../controllers";
import { ValidationMiddleware } from "../middlewares";
import { ScheduleDto } from "../common/dtos";

export class ScheduleRoute {
  public router: Router;
  private scheduleController: ScheduleController;

  constructor() {
    this.router = Router();
    this.scheduleController = new ScheduleController();

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      "/",
      new ValidationMiddleware(ScheduleDto).validate,
      this.scheduleController.addSchedule
    );
  }
}
