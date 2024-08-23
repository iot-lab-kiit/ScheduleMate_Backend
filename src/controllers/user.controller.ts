import { Request, Response } from "express";
import { MethodBinder } from "../utils";
import { plainToInstance } from "class-transformer";
import {UserService} from "../services/user.service";
import {UserDto} from "../common/dtos/user.dto";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
    MethodBinder.bind(this);
  }

  async createOrUpdateUser(req: Request, res: Response): Promise<void> {
    try {
      const dto = plainToInstance(UserDto, req.body);
      const result = await this.userService.createOrUpdateUser(dto as UserDto);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  }
}
