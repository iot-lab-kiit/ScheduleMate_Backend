import { Application } from 'express';
import { HomeRoute } from './home.route';
import { ScheduleRoute } from './schedule.route';
import { HolidayRoute } from './holiday.route';
import { UserRoute } from './user.route';
import {
  AuthMiddleware,
  GlobalErrorMiddleware,
  NotFoundMiddleware,
  PrismaErrorMiddleware,
} from '../middlewares';
import { ElectiveRoute } from './elective.route';

export class Routes {
  private homeRoute: HomeRoute;
  private scheduleRoute: ScheduleRoute;
  private holidayRoute: HolidayRoute;
  private userRoute: UserRoute;
  private electiveRoute: ElectiveRoute;
  private authMiddleware: AuthMiddleware;

  constructor(private app: Application) {
    this.homeRoute = new HomeRoute();
    this.scheduleRoute = new ScheduleRoute();
    this.holidayRoute = new HolidayRoute();
    this.userRoute = new UserRoute();
    this.electiveRoute = new ElectiveRoute();
    this.authMiddleware = new AuthMiddleware();

    // this.app.use(this.authMiddleware.verify);
    this.app.use('/api', this.homeRoute.router);
    this.app.use('/api/schedule', this.scheduleRoute.router);
    this.app.use('/api/holiday', this.holidayRoute.router);
    this.app.use('/api/user', this.userRoute.router);
    this.app.use('/api/elective', this.electiveRoute.router);
    this.app.use(NotFoundMiddleware.handle);
    this.app.use(PrismaErrorMiddleware.handle);
    this.app.use(GlobalErrorMiddleware.handle);
  }
}
