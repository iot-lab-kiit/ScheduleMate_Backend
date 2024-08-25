import { NextFunction, Request, Response } from 'express';
import { MethodBinder } from '../utils';
import { plainToInstance } from 'class-transformer';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../common/dtos';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
    MethodBinder.bind(this);
  }

  async createUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dto = plainToInstance(CreateUserDto, { ...req.user, ...req.body });
      const result = await this.userService.createUser(dto);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dto = plainToInstance(UpdateUserDto, { ...req.user, ...req.body });
      const result = await this.userService.updateUser(dto);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async getUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    if (!req.user || !req.user.uid) {
      res.status(400).json({
        success: false,
        message: 'Bad request exception',
      });
      return;
    }
    try {
      const result = await this.userService.getUser(req.user.uid);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
