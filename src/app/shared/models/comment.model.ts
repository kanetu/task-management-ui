import { Base } from './base.model';
import { User } from './user.model';

export interface Comment extends Base {
  id: string;
  content: string;
  user: User;
}
