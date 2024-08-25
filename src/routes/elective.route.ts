import { Router } from 'express';
import { ElectiveController } from '../controllers';
import { ElectiveAuthMiddleware, ValidationMiddleware } from '../middlewares';
import { UpdateElectiveDto } from '../common/dtos';
import { CreateElectiveArrayDto } from '../common/dtos/elective/createElectiveArray.dto';

export class ElectiveRoute {
  public router: Router;
  private electiveController: ElectiveController;
  private electiveAuthMiddleware: ElectiveAuthMiddleware;

  constructor() {
    this.router = Router();
    this.electiveController = new ElectiveController();
    this.electiveAuthMiddleware = new ElectiveAuthMiddleware();

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      '/',
      new ValidationMiddleware(CreateElectiveArrayDto).validate,
      this.electiveController.createElectives,
    );
    this.router.get('/', this.electiveController.getElectives);
    this.router.patch(
      '/:id',
      this.electiveAuthMiddleware.verify,
      new ValidationMiddleware(UpdateElectiveDto).validate,
      this.electiveController.updateElective,
    );
    this.router.delete(
      '/:id',
      this.electiveAuthMiddleware.verify,
      this.electiveController.deleteElective,
    );
  }
}
