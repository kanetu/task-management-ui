import { Base } from './base.model';
import { Task } from './task.model';

export interface Project extends Base {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
}
