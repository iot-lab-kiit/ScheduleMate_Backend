import { Application } from "express";
import { HomeRoute } from "./home.route";
import { ScheduleRoute } from "./schedule.route";

export class Routes {
  private homeRoute: HomeRoute;
  private scheduleRoute: ScheduleRoute;

  constructor(private app: Application) {
    this.homeRoute = new HomeRoute();
    this.scheduleRoute = new ScheduleRoute();

    this.app.use("/api", this.homeRoute.router);
    this.app.use("/api/schedule", this.scheduleRoute.router);
  }
}
