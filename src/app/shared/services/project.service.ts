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
    return this.http.post<IFilterProjectResponse>(
      baseAPI + API.filterProject,
      payload,
    );
  }

  getProject(projectId: string): Observable<IGetProjectResponse> {
    return this.http.get<IGetProjectResponse>(
      baseAPI + API.getProject.replace('{{projectId}}', projectId),
    );
  }
}
