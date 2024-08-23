import { Application } from "express";
import { HomeRoute } from "./home.route";
import { ScheduleRoute } from "./schedule.route";
import { HolidayRoute } from "./holiday.route";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UserRoute } from "./user.route";

export class Routes {
  private homeRoute: HomeRoute;
  private scheduleRoute: ScheduleRoute;
  private holidayRoute: HolidayRoute;
  private userRoute: UserRoute;
  private authMiddleware: AuthMiddleware;

  constructor(private app: Application) {
    this.homeRoute = new HomeRoute();
    this.scheduleRoute = new ScheduleRoute();
    this.holidayRoute = new HolidayRoute();
    this.userRoute = new UserRoute();
    this.authMiddleware = new AuthMiddleware();

    this.app.use(this.authMiddleware.verify);
    this.app.use("/api", this.homeRoute.router);
    this.app.use("/api/schedule", this.scheduleRoute.router);
    this.app.use("/api/holiday", this.holidayRoute.router);
    this.app.use("/api/user", this.userRoute.router);
  }
}
