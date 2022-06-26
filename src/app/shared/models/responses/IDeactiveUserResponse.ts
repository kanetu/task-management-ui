import { IBaseRepsonse } from '../common/IBaseResponse';

export interface IDeactiveUserResponse extends IBaseRepsonse {
  data: {
    isActive: boolean;
  };
}
