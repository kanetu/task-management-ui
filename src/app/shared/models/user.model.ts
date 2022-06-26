import { Base } from './base.model';

export interface User extends Base {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  birthday: string;
  isActive: boolean;
  avatarUrl: string;
  role: any;
}
