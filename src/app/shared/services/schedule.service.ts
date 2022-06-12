import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetSchedulesResponse } from '../models/responses/IGetSchedulesResponse';
import { Schedule } from '../models/schedule.model';
import { API, baseAPI } from './apis';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}

  getSchedulesInRange(params: {
    firstDate: string;
    lastDate: string;
  }): Observable<IGetSchedulesResponse> {
    return this.http.get(baseAPI + API.getSchedulesInRange, {
      params,
    }) as Observable<IGetSchedulesResponse>;
  }

  getSchedules(date: string): Observable<IGetSchedulesResponse> {
    return this.http.get(
      baseAPI + API.getAllSchedules + `/${date}`,
    ) as Observable<IGetSchedulesResponse>;
  }

  createSchedule(data: any): Observable<Schedule> {
    return this.http.post(
      baseAPI + API.addSchedule,
      data,
    ) as Observable<Schedule>;
  }

  updateSchedule(scheduleId: string, data: any): Observable<Schedule> {
    return this.http.put(
      baseAPI + API.updateSchedule.replace('{{scheduleId}}', scheduleId),
      data,
    ) as Observable<Schedule>;
  }
}
