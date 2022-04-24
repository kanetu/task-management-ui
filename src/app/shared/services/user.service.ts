import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { API, baseAPI } from './apis';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUser(): Observable<User[]> {
    return this.http.get(baseAPI + API.getAllUser) as Observable<User[]>;
  }
}
