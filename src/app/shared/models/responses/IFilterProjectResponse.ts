import { IBaseRepsonse } from '../common/IBaseResponse';
import { Project } from '../project.model';

export interface IFilterProjectResponse extends IBaseRepsonse {
  data: Project[];
  paging: {
    pageIndex: number;
    pageSize: number;
    keyword: string;
    total: number;
  };
}
