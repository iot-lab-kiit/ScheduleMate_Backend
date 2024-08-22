import { Application } from "express";
import { HomeRoute } from "./home.route";
import { ScheduleRoute } from "./schedule.route";
import { HolidayRoute } from "./holiday.route";

export class Routes {
  private homeRoute: HomeRoute;
  private scheduleRoute: ScheduleRoute;
  private holidayRoute: HolidayRoute;

  constructor(private app: Application) {
    this.homeRoute = new HomeRoute();
    this.scheduleRoute = new ScheduleRoute();
    this.holidayRoute = new HolidayRoute();

    this.app.use("/api", this.homeRoute.router);
    this.app.use("/api/schedule", this.scheduleRoute.router);
    this.app.use("/api/holiday", this.holidayRoute.router);
  }
}
