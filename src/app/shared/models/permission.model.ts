import { Base } from './base.model';

export interface Permission extends Base {
  id: number;
  title: string;
  active: boolean;
  description: string;
}
