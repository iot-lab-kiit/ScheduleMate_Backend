import { NextFunction, Request, Response } from 'express';
import { MethodBinder } from '../utils';
import { plainToInstance } from 'class-transformer';
import { UserService } from '../services/user.service';
import { UserDto } from '../common/dtos';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
    MethodBinder.bind(this);
  }

  async createOrUpdateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dto = plainToInstance(UserDto, req.body);
      const result = await this.userService.createOrUpdateUser(dto as UserDto);
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
    if (!req.user || !req.user.user_id) {
      res.status(400).json({
        success: false,
        message: 'Bad request exception',
      });
      return;
    }
    try {
      const result = await this.userService.getUser(req.user.user_id);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
