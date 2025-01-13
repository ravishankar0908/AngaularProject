import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],
})
export class ViewTaskComponent implements OnInit {
  taskDetails: any[] = [];
  message: string = '';

  displayedColumns: string[] = [
    'position',
    'name',
    'description',
    'created',
    'duedate',
    'employee',
    'manager',
    'status',
  ];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getAllTask();
  }

  getAllTask() {
    this.taskService.getAllTask().subscribe({
      next: (res) => {
        this.taskDetails = res.taskDetails;
      },
      error: (error) => {},
    });
  }
}
