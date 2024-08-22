import { Application } from "express";
import { HomeRoute } from "./home.route";
import { ScheduleRoute } from "./schedule.route";
import { HolidayRoute } from "./holiday.route";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class Routes {
  private homeRoute: HomeRoute;
  private scheduleRoute: ScheduleRoute;
  private holidayRoute: HolidayRoute;
  private authMiddleware: AuthMiddleware;

  constructor(private app: Application) {
    this.homeRoute = new HomeRoute();
    this.scheduleRoute = new ScheduleRoute();
    this.holidayRoute = new HolidayRoute();
    this.authMiddleware = new AuthMiddleware();

    this.app.use(this.authMiddleware.verify);
    this.app.use("/api", this.homeRoute.router);
    this.app.use("/api/schedule", this.scheduleRoute.router);
    this.app.use("/api/holiday", this.holidayRoute.router);
  }
}
