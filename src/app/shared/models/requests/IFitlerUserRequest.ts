import { IPaging } from '../common/IPaging';

export interface IFilterUserRequest {
  paging: IPaging;
  keyword: string;
}
