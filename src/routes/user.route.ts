import { Router } from 'express';
import { UserController } from '../controllers';
import { ValidationMiddleware } from '../middlewares';
import { UpdateUserDto } from '../common/dtos/user/updateUser.dto';
import { CreateUserDto } from '../common/dtos';

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
      new ValidationMiddleware(CreateUserDto).validate,
      this.userController.createUser,
    );
    this.router.patch(
      '/updateuser',
      new ValidationMiddleware(UpdateUserDto).validate,
      this.userController.createUser,
    );
    this.router.get('/userdetails', this.userController.getUser);
  }
}
