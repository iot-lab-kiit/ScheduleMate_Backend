import { Router } from "express";
import { ScheduleController } from "../controllers";

export class ScheduleRoute {
  public router: Router;
  private scheduleController: ScheduleController;

  constructor() {
    this.router = Router();
    this.scheduleController = new ScheduleController();

    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/", this.scheduleController.addSchedule);
  }
}
