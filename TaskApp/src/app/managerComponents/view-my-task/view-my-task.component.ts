import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-my-task',
  templateUrl: './view-my-task.component.html',
  styleUrls: ['./view-my-task.component.scss'],
})
export class ViewMyTaskComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  myTask: any[] = [];
  displayedColumns: string[] = [
    'position',
    'name',
    'created',
    'duedate',
    'description',
    'status',
    'employeeName',
    'action',
    'submit',
  ];

  ngOnInit(): void {
    this.getTask();
  }

  getTask() {
    const managerId = localStorage.getItem('userId');
    this.taskService.getTask(managerId).subscribe({
      next: (res) => {
        this.myTask = res.details;
      },
      error: (error) => {
        if (error.status === 400) console.error(error.message);
      },
    });
  }

  isPastDue(dueDate: Date): boolean {
    const currentDate = new Date();
    return new Date(dueDate) < currentDate;
  }

  getStatusClass(status: string): string {
    if (status === 'pending') {
      return 'pending';
    } else if (status === 'completed') {
      return 'completed';
    }
    return ''; // Default case if status is not recognized
  }

  updateTask(id: any) {
    this.router.navigate(['/manager/task', { taskId: id }]);
  }

  deleteMyTask(id: any) {
    if (confirm('Are you sure you want to delete the task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: (res) => {
          this.toaster.success(res.message, 'success');
        },
        error: (error) => {
          this.toaster.error(error.error.message, 'error');
        },
      });
    }
  }
}
