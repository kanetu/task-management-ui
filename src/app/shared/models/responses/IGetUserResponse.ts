import { IBaseRepsonse } from '../common/IBaseResponse';
import { User } from '../user.model';

export interface IGetUserResponse extends IBaseRepsonse {
  data: User;
}
