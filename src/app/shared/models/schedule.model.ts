export interface Schedule {
  id: string;
  title: string;
  description: string;
  creator: number;
  users: any;
  place: string;
  timeStart: string | Date;
  timeEnd: string | Date;
}
