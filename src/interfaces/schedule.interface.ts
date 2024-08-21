export interface ISchedule {
  [section: string]: ISectionSchedule;
}

export interface ISectionSchedule {
  [day: string]: IClassSchedule[];
}

export interface IClassSchedule {
  startTime: string;
  endTime: string;
  subject: string;
  room: string;
}
