import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API, baseAPI } from './apis';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getAllProject(): Observable<any[]> {
    return this.http.get(baseAPI + API.getAllProject) as Observable<any[]>;
  }

  getProject(projectId: string): Observable<any> {
    return this.http.get(
      baseAPI + API.getProject.replace('{{projectId}}', projectId)
    ) as Observable<any>;
  }
}
