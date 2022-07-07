import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API, baseAPI } from './apis';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(baseAPI + API.login, data);
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(baseAPI + API.register, data);
  }
}
