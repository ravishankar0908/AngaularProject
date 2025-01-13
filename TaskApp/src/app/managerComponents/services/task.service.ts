import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  postTaskApi = 'http://localhost:3000/task';
  getTaskApi = 'http://localhost:3000/manager/my-task';

  // post task
  postTask(managerId: any, taskDetails: any): Observable<any> {
    const url = `${this.postTaskApi}?managerId=${managerId}`;
    return this.http.post(url, taskDetails);
  }

  // get the task
  getTask(managerId: any): Observable<any> {
    const url = `${this.getTaskApi}?managerId=${managerId}`;
    return this.http.get<any>(url);
  }
}
