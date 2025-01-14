import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ToastrService } from 'ngx-toastr';

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
    'action',
  ];

  constructor(
    private taskService: TaskService,
    private toaster: ToastrService
  ) {}

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

  isPastDue(dueDate: Date): boolean {
    const currentDate = new Date();
    return new Date(dueDate) < currentDate;
  }

  isDelete(status: Boolean): boolean {
    if (status) {
      return true;
    } else {
      return false;
    }
  }

  getStatusClass(status: string): string {
    if (status === 'pending') {
      return 'pending';
    } else if (status === 'completed') {
      return 'completed';
    }
    return '';
  }

  restoreTask(id: any) {
    if (confirm('Are you sure you want to restore the task?')) {
      this.taskService.restoreTask(id).subscribe({
        next: (res) => {
          this.toaster.success(res.message, 'success');
        },
        error: (err) => {
          this.toaster.error(err.error.message, 'failed');
        },
      });
    }
  }
}
