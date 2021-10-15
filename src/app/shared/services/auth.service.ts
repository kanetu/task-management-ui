import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API, baseAPI } from './apis';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  httpOptions = {
    withCredentials: true,
  };

  login(data: any) {
    return this.http.post(baseAPI + API.login, data, this.httpOptions);
  }

  register(data: any): Observable<any> {
    return this.http.post(
      baseAPI + API.register,
      data,
      this.httpOptions
    ) as Observable<any>;
  }
}
