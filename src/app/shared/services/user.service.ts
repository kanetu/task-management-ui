import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilterUserRequest } from '../models/requests/IFitlerUserRequest';
import { IUpdateAvatarRequest } from '../models/requests/IUpdateAvatarRequest';
import { IUpdateUserRequest } from '../models/requests/IUpdateUserRequest';
import { IDeactiveUserResponse } from '../models/responses/IDeactiveUserResponse';
import { IFilterUserResponse } from '../models/responses/IFitlerUserResponse';
import { IGetUserResponse } from '../models/responses/IGetUserResponse';
import { IUpdateAvatarResponse } from '../models/responses/IUpdateAvatarResponse';
import { IUpdateUserResponse } from '../models/responses/IUpdateUserResponse';
import { API, baseAPI } from './apis';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<IGetUserResponse> {
    return this.http.get<IGetUserResponse>(baseAPI + API.getUser);
  }

  filterUser(payload: IFilterUserRequest): Observable<IFilterUserResponse> {
    return this.http.post<IFilterUserResponse>(
      baseAPI + API.filterUser,
      payload,
    );
  }

  updateAvatar(
    payload: IUpdateAvatarRequest,
  ): Observable<IUpdateAvatarResponse> {
    return this.http.post<IUpdateAvatarResponse>(
      baseAPI + API.updateAvatar,
      payload,
    );
  }

  deactiveUser(): Observable<IDeactiveUserResponse> {
    return this.http.delete<IDeactiveUserResponse>(baseAPI + API.deactiveUser);
  }

  updateUser(payload: IUpdateUserRequest): Observable<IUpdateUserResponse> {
    return this.http.put<IUpdateUserResponse>(
      baseAPI + API.updateUser,
      payload,
    );
  }
}
