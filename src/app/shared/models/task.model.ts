import { Base } from './base.model';

export interface Task extends Base {
  id: string;
  title: string;
  description: string;
  status: string;
  remaining: number;
  estimate: number;
  complete: number;
}
