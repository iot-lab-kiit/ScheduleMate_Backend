import { Router } from 'express';
import { UserController } from '../controllers';
import { ValidationMiddleware } from '../middlewares';
import { UserDto } from '../common/dtos';
import { UserUpdateDto } from '../common/dtos/userUpdate.dto';

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
      '/createuser',
      new ValidationMiddleware(UserDto).validate,
      this.userController.createUser,
    );
    this.router.patch(
      '/updateuser',
      new ValidationMiddleware(UserUpdateDto).validate,
      this.userController.createUser,
    );
    this.router.get('/userdetails', this.userController.getUser);
  }
}
