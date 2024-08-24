import { PrismaClient } from '@prisma/client';
import { IResponse } from '../interfaces';
import { UserDto } from '../common/dtos';
import { UserUpdateDto } from '../common/dtos/userUpdate.dto';

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(user: UserDto): Promise<IResponse> {
    const updatedUser = await this.prisma.user.create({
      data: {
        uid: user.uid,
        name: user.name,
        email: user.email,
        photoUrl: user.photoUrl,
        electiveSection: user.elective_section,
        section: {
          connect: {
            semester_name: {
              name: user.section,
              semester: user.semester,
            },
          },
        },
      },
    });
    return {
      success: true,
      message: 'User Added Successfully.',
      data: updatedUser,
    };
  }

  async updateUser(user: UserUpdateDto): Promise<IResponse> {
    const updatedUser = await this.prisma.user.update({
      where: {
        uid: user.uid,
      },
      data: {
        name: user.name,
        email: user.email,
        photoUrl: user.photoUrl,
        electiveSection: user.elective_section,
        section: {
          connect: {
            semester_name: {
              name: user.section,
              semester: user.semester,
            },
          },
        },
      },
    });
    return {
      success: true,
      message: 'User Updated Successfully.',
      data: updatedUser,
    };
  }

  async getUser(userId: string): Promise<IResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        uid: userId,
      },
    });
    return {
      success: true,
      message: 'User Fetched Successfully.',
      data: user,
    };
  }
}
