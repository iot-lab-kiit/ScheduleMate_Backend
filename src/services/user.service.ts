import { PrismaClient } from '@prisma/client';
import { IResponse } from '../interfaces';
import { CreateUserDto, UpdateUserDto } from '../common/dtos';

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(dto: CreateUserDto): Promise<IResponse> {
    const user = await this.prisma.user.create({
      data: {
        uid: dto.uid,
        name: dto.name,
        email: dto.email,
        photoUrl: dto.photoUrl,
        section: {
          connect: {
            semester_name: {
              name: dto.section,
              semester: dto.semester,
            },
          },
        },
      },
    });
    return {
      success: true,
      message: 'User Added Successfully.',
      data: user,
    };
  }

  async updateUser(dto: UpdateUserDto): Promise<IResponse> {
    const user = await this.prisma.user.update({
      where: {
        uid: dto.uid,
      },
      data: {
        name: dto.name,
        email: dto.email,
        photoUrl: dto.photoUrl,
        section: {
          connect: {
            semester_name: {
              name: dto.section,
              semester: dto.semester,
            },
          },
        },
      },
    });
    return {
      success: true,
      message: 'User Updated Successfully.',
      data: user,
    };
  }

  async getUser(userId: string): Promise<IResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        uid: userId,
      },
      include: {
        section: {
          include: {
            timetable: {
              include: {
                schedule: true,
              },
            },
          },
        },
        elective: true,
      },
    });
    return {
      success: true,
      message: 'User Fetched Successfully.',
      data: user,
    };
  }
}
