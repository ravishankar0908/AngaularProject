import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyTaskService {
  constructor(private http: HttpClient) {}

  // updateBehaviourSubject = new BehaviorSubject<any>('');

  myTaskApi = 'http://localhost:3000/employee/my-task';
  updateTaskApi = 'http://localhost:3000/employee/task';

  getMyTask(employeeId: any): Observable<any> {
    const url = `${this.myTaskApi}?employeeId=${employeeId}`;
    return this.http.get<any>(url);
  }

  // setUpdate(taskId: any): any {
  //   this.updateBehaviourSubject.next(this.updateTaskStatus(taskId));
  // }

  // getUpdate(): any {
  //   return this.updateBehaviourSubject.asObservable();
  // }

  updateTaskStatus(taskId: any): Observable<any> {
    const url = `${this.updateTaskApi}?taskId=${taskId}`;
    const updateValue = { status: 'completed' };
    return this.http.patch<any>(url, updateValue);
  }
}
