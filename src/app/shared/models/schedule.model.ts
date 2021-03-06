import { Base } from './base.model';

export interface Schedule extends Base {
  id: string;
  title: string;
  description: string;
  creator: number;
  users: any;
  place: string;
  timeStart: string | Date;
  timeEnd: string | Date;
}
