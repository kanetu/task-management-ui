import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginResponse } from '../models/responses/ILoginResponse';
import { ILogoutResponse } from '../models/responses/ILogoutResponse';
import { API, baseAPI } from './apis';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: any): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(baseAPI + API.login, data);
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(baseAPI + API.register, data);
  }

  logout(): Observable<ILogoutResponse> {
    return this.http.get<ILogoutResponse>(baseAPI + API.logout);
  }
}
