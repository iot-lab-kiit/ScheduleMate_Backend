import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { IClassSchedule, IResponse, ISchedule } from "../interfaces";
import { ScheduleDto } from "../common/dtos";

export class ScheduleService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async addSchedule(dto: ScheduleDto): Promise<IResponse> {
    const { semester } = dto;
    const data = readFileSync(`./src/data/semester${semester}.json`, {
      encoding: "utf8",
    });
    const result: ISchedule = JSON.parse(data);
    const sections = Object.keys(result);
    await Promise.all(
      sections.map(async (section) => {
        const days = Object.keys(result[section]);
        await this.prisma.section.create({
          data: {
            name: section,
            semester,
            timetable: {
              create: days.map((day) => {
                const daySchedule: IClassSchedule[] = result[section][day];
                return {
                  weekDay: day,
                  schedule: {
                    create: daySchedule.map((schedule: IClassSchedule) => {
                      return {
                        startTime: schedule.startTime,
                        endTime: schedule.endTime,
                        subject: schedule.subject,
                        room: schedule.room,
                      };
                    }),
                  },
                };
              }),
            },
          },
        });
      }),
    );
    return {
      success: true,
      message: `successfully added semester ${semester}`,
    };
  }
}
