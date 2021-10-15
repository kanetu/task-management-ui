import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { API, baseAPI } from './apis';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    withCredentials: true,
  };

  getAllProject(): Observable<never[]> {
    return this.http.get(
      baseAPI + API.getAllProject,
      this.httpOptions
    ) as Observable<never[]>;
  }

  getProject(projectId: string): Observable<Project> {
    return this.http.get(
      baseAPI + API.getProject.replace('{{projectId}}', projectId),
      this.httpOptions
    ) as Observable<Project>;
  }
}
