import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { API, baseAPI } from './apis';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  createTask(projectId: string, body: any): Observable<Task> {
    return this.http.post(
      baseAPI + API.addTask.replace('{{projectId}}', projectId),
      body
    ) as Observable<Task>;
  }

  updateTask(taskId: string, body: any): Observable<Task> {
    return this.http.put(
      baseAPI + API.updateTask.replace('{{taskId}}', taskId),
      body
    ) as Observable<never>;
  }
}
