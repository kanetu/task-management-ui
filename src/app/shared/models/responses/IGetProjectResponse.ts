import { IBaseRepsonse } from '../common/IBaseResponse';
import { Project } from '../project.model';

export interface IGetProjectResponse extends IBaseRepsonse {
  data: Project;
}
