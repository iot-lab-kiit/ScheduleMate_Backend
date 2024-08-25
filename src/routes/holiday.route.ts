import { Router } from 'express';
import { HolidayController } from '../controllers';

export class HolidayRoute {
  public router: Router;
  private holidayController: HolidayController;

  constructor() {
    this.router = Router();
    this.holidayController = new HolidayController();

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/', this.holidayController.addHoliday);
    this.router.get('/', this.holidayController.getHolidays);
  }
}
