import { IBaseRepsonse } from '../common/IBaseResponse';
import { User } from '../user.model';

export interface IFilterUserResponse extends IBaseRepsonse {
  data: User[];
  paging: {
    pageIndex: number;
    pageSize: number;
    keyword: string;
    total: number;
  };
}
