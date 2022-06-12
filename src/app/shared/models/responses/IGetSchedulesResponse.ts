import { IBaseRepsonse } from '../common/IBaseResponse';
import { Schedule } from '../schedule.model';

export interface IGetSchedulesResponse extends IBaseRepsonse {
  data: Schedule[];
}
