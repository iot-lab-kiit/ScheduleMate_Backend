import { PrismaClient } from '@prisma/client';
import { IHoliday, IResponse } from '../interfaces';
import { readFileSync } from 'fs';

export class HolidayService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async addHoliday(): Promise<IResponse> {
    const data = readFileSync('./src/data/holidays.json', {
      encoding: 'utf8',
    });
    const result: IHoliday[] = JSON.parse(data);
    await Promise.all(
      result.map(async (holiday: IHoliday) => {
        await this.prisma.holiday.create({
          data: {
            dates: holiday.DATE,
            days: holiday.DAYS,
            event: holiday.EVENT,
          },
        });
      }),
    );
    return {
      success: true,
      message: 'holidays added successfully',
    };
  }
}
