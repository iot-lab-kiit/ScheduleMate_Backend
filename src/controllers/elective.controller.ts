import { NextFunction, Request, Response } from 'express';
import { ElectiveService } from '../services/elective.service';
import { MethodBinder } from '../utils';
import { plainToInstance } from 'class-transformer';
import { UpdateElectiveDto } from '../common/dtos';
import { CreateElectiveArrayDto } from '../common/dtos/elective/createElectiveArray.dto';

export class ElectiveController {
  private electiveService: ElectiveService;

  constructor() {
    MethodBinder.bind(this);
    this.electiveService = new ElectiveService();
  }

  async createElectives(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dto = plainToInstance(CreateElectiveArrayDto, req.body);
      const uid = req.user?.uid as string;
      const result = await this.electiveService.createElectives(
        dto.electives,
        uid,
      );
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getElectives(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const uid = req.user?.uid as string;
      const result = await this.electiveService.getElectives(uid);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async updateElective(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dto = plainToInstance(UpdateElectiveDto, req.body);
      const electiveId = req.params?.id;
      const result = await this.electiveService.updateElectives(
        dto,
        electiveId,
      );
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async deleteElective(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const electiveId = req.params?.id;
      const result = await this.electiveService.deleteElective(electiveId);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
