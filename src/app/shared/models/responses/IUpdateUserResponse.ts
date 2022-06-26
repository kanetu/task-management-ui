import { IBaseRepsonse } from '../common/IBaseResponse';
import { User } from '../user.model';

export interface IUpdateUserResponse extends IBaseRepsonse {
  data: User;
}
