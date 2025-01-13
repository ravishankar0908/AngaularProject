import { Component, OnInit } from '@angular/core';
import { MyTaskService } from '../services/my-task.service';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss'],
})
export class MyTasksComponent implements OnInit {
  constructor(private mytaskService: MyTaskService) {}

  myTask: any[] = [];
  displayedColumns: string[] = [
    'position',
    'name',
    'description',
    'duedate',
    'status',
    'action',
    'createat',
  ];

  ngOnInit(): void {
    this.getMyTask();
  }

  getMyTask() {
    const employeeId = localStorage.getItem('userId');

    this.mytaskService.getMyTask(employeeId).subscribe({
      next: (res) => {
        this.myTask = res.details;
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }

  completeTask(taskID: any) {
    const taskId = taskID;

    this.mytaskService.updateTaskStatus(taskId).subscribe({
      next: (res) => {
        console.log(res.message);
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }
}
