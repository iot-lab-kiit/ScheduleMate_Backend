import { PrismaClient } from '@prisma/client';
import { IResponse } from '../interfaces';
import { UserDto } from '../common/dtos';

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createOrUpdateUser(user: UserDto): Promise<IResponse> {
    const updatedUser = await this.prisma.user.upsert({
      where: {
        uid: user.user_id,
      },
      update: {
        name: user.name,
        email: user.email,
        photoUrl: user.photoUrl,
        electiveSection: user.elective_section,
        sectionId: user.section,
      },
      create: {
        uid: user.user_id,
        name: user.name,
        email: user.email,
        photoUrl: user.photoUrl,
        electiveSection: user.elective_section,
        sectionId: user.section,
      },
    });
    return {
      success: true,
      message: 'User Added Successfully.',
      data: updatedUser,
    };
  }
}
