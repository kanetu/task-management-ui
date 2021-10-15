import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from '../models/schedule.model';
import { API, baseAPI } from './apis';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    withCredentials: true,
  };

  getSchedules(): Observable<Schedule[]> {
    return this.http.get(
      baseAPI + API.getAllSchedule,
      this.httpOptions
    ) as Observable<Schedule[]>;
  }

  createSchedule(data: any): Observable<Schedule> {
    return this.http.post(
      baseAPI + API.addSchedule,
      data,
      this.httpOptions
    ) as Observable<Schedule>;
  }

  updateSchedule(scheduleId: string, data: any): Observable<Schedule> {
    return this.http.put(
      baseAPI + API.updateSchedule.replace('{{scheduleId}}', scheduleId),
      data,
      this.httpOptions
    ) as Observable<Schedule>;
  }
}
