import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getTaskApi = 'http://localhost:3000/task/all-tasks';

  getAllTask(): Observable<any> {
    return this.http.get<any>(this.getTaskApi);
  }
}
