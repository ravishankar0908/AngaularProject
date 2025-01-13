import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../services/manager.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../services/employee.service';
import { toastMessage } from 'src/app/toastMessage';

@Component({
  selector: 'app-view-managers',
  templateUrl: './view-managers.component.html',
  styleUrls: ['./view-managers.component.scss'],
})
export class ViewManagersComponent implements OnInit {
  constructor(
    private managerService: ManagerService,
    private toaster: ToastrService,
    private employeeService: EmployeeService
  ) {}

  managerDetails: any[] = [];
  message: string = '';

  displayedColumns: string[] = [
    'position',
    'fname',
    'lname',
    'email',
    'role',
    'gender',
    'joined',
    'actions',
  ];

  ngOnInit(): void {
    this.getManager();
  }

  getManager() {
    this.managerService.getAllManager().subscribe({
      next: (res) => {
        this.message = res.message;
        this.managerDetails = res.ManagerDetails;
      },
      error: (error) => {
        if (error.status === 404) {
          console.log(error.message);
        }
        console.log(error.message);
      },
    });
  }

  editManager(userId: any) {}
  deleteManager(id: any) {
    const userId = id;
    if (confirm('Are you sure?')) {
      this.employeeService.deleteEmployeeById(userId).subscribe({
        next: (res) => {
          this.toaster.success(res.message, 'delete');
        },
        error: (err) => {
          this.toaster.success(err.message, 'delete');
        },
      });
    }
  }
  dePromoteManager(id: any) {
    const userId = id;

    if (confirm('Are you sure you want to de-promote the user?')) {
      this.managerService.dePromoteManager(userId).subscribe({
        next: (res) => {
          this.toaster.success(res.message, 'De-promoted');
        },
        error: (error) => {
          this.toaster.success(error.message, toastMessage.errorTitle);
        },
      });
    }
  }
}
