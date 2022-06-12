import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilterUserRequest } from '../models/requests/IFitlerUserRequest';
import { IFilterUserResponse } from '../models/responses/IFitlerUserResponse';
import { API, baseAPI } from './apis';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  filterUser(payload: IFilterUserRequest): Observable<IFilterUserResponse> {
    return this.http.post(
      baseAPI + API.filterUser,
      payload,
    ) as Observable<IFilterUserResponse>;
  }
}
