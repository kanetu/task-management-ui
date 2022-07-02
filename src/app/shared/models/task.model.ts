import { Base } from './base.model';
import { Comment } from './comment.model';
import { User } from './user.model';

export interface Task extends Base {
  id: string;
  title: string;
  description: string;
  status: string;
  remaining: number;
  estimate: number;
  complete: number;
  priority: string;
  assignTo: User;
  comments: Comment[];
}
