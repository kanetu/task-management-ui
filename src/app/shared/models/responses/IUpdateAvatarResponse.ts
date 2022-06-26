import { IBaseRepsonse } from '../common/IBaseResponse';
import { User } from '../user.model';

export interface IUpdateAvatarResponse extends IBaseRepsonse {
  data: User;
}
