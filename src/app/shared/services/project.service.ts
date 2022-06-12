import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilterProjectRequest } from 'src/app/shared/models/requests/IFilterProjectRequest';
import { IFilterProjectResponse } from '../models/responses/IFilterProjectResponse';
import { IGetProjectResponse } from '../models/responses/IGetProjectResponse';
import { API, baseAPI } from './apis';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  filterProject(
    payload: IFilterProjectRequest,
  ): Observable<IFilterProjectResponse> {
    return this.http.post(
      baseAPI + API.filterProject,
      payload,
    ) as Observable<IFilterProjectResponse>;
  }

  getProject(projectId: string): Observable<IGetProjectResponse> {
    return this.http.get(
      baseAPI + API.getProject.replace('{{projectId}}', projectId),
    ) as Observable<IGetProjectResponse>;
  }
}
