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
    return this.http.get<IGetSchedulesResponse>(
      baseAPI + API.getSchedulesInRange,
      {
        params,
      },
    );
  }

  getSchedules(date: string): Observable<IGetSchedulesResponse> {
    return this.http.get<IGetSchedulesResponse>(
      baseAPI + API.getAllSchedules + `/${date}`,
    );
  }

  createSchedule(data: any): Observable<Schedule> {
    return this.http.post<Schedule>(baseAPI + API.addSchedule, data);
  }

  updateSchedule(scheduleId: string, data: any): Observable<Schedule> {
    return this.http.put<Schedule>(
      baseAPI + API.updateSchedule.replace('{{scheduleId}}', scheduleId),
      data,
    );
  }
}
