import { PrismaClient } from '@prisma/client';
import { IResponse } from '../interfaces';
import { CreateElectiveDto, UpdateElectiveDto } from '../common/dtos';

export class ElectiveService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createElectives(
    dtos: CreateElectiveDto[],
    uid: string,
  ): Promise<IResponse> {
    await Promise.all(
      dtos.map(async (dto: CreateElectiveDto) => {
        const { days, endTime, name, room, section, startTime } = dto;
        await this.prisma.elective.create({
          data: {
            endTime,
            days,
            name,
            room,
            section,
            startTime,
            user: {
              connect: {
                uid,
              },
            },
          },
        });
      }),
    );
    return {
      success: true,
      message: 'elective added successfully',
    };
  }

  async getElectives(uid: string): Promise<IResponse> {
    const electives = await this.prisma.elective.findFirst({
      where: {
        user: {
          uid,
        },
      },
    });

    return {
      success: true,
      message: 'elective fetched successfully',
      data: electives,
    };
  }

  async updateElectives(
    dto: UpdateElectiveDto,
    electiveId: string,
  ): Promise<IResponse> {
    this.prisma.elective.updateMany({
      where: {
        id: electiveId,
      },
      data: dto,
    });

    return {
      success: true,
      message: 'elective updated successfully',
    };
  }

  async deleteElective(electiveId: string): Promise<IResponse> {
    await this.prisma.elective.delete({
      where: {
        id: electiveId,
      },
    });

    return {
      success: true,
      message: 'elective deleted successfully',
    };
  }
}
