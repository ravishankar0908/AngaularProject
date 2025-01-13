import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginApi = 'http://localhost:3000/auth';

  loginAuth(credentials: any): Observable<any> {
    return this.http.post(this.loginApi, credentials);
  }
}
