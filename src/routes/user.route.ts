import { Router } from "express";
import {ScheduleController, UserController} from "../controllers";
import { ValidationMiddleware } from "../middlewares";
import { ScheduleDto } from "../common/dtos";
import {UserDto} from "../common/dtos/user.dto";

export class UserRoute {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      "/userdetails",
      new ValidationMiddleware(UserDto).validate,
      this.userController.createOrUpdateUser
    );
  }
}
