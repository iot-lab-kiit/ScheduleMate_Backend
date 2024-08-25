import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

export class ElectiveAuthMiddleware {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const elective = this.prisma.elective.findUnique({
        where: {
          id: req.params.id,
          user: {
            uid: req.user?.uid,
          },
        },
      });
      if (!elective) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorised Exception',
        });
      }
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
