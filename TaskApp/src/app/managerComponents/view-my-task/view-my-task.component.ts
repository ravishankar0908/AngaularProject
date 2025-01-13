import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-view-my-task',
  templateUrl: './view-my-task.component.html',
  styleUrls: ['./view-my-task.component.scss'],
})
export class ViewMyTaskComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  myTask: any[] = [];
  displayedColumns: string[] = [
    'position',
    'name',
    'created',
    'duedate',
    'description',
    'status',
    'employeeName',
  ];

  ngOnInit(): void {
    this.getTask();
  }

  getTask() {
    const managerId = localStorage.getItem('userId');
    this.taskService.getTask(managerId).subscribe({
      next: (res) => {
        this.myTask = res.details;
        console.log(res);
      },
      error: (error) => {
        if (error.status === 400) console.error(error.message);
      },
    });
  }
}
