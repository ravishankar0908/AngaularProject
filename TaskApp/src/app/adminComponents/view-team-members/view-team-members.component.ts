import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-team-members',
  templateUrl: './view-team-members.component.html',
  styleUrls: ['./view-team-members.component.scss'],
})
export class ViewTeamMembersComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private toaster: ToastrService
  ) {}

  employeeDetails: any[] = [];
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
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.employeeService.getAllEmployee().subscribe({
      next: (res) => {
        this.employeeDetails = res.employeeDetails;
      },
      error: (error) => {},
    });
  }

  editEmployee(id: any) {
    alert(id);
  }

  deleteEmployee(id: any) {
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

  // promote employee to manager
  promoteEmployee(userId: any) {
    if (confirm('Are you sure you want to promote')) {
      this.employeeService.promoteEmployee(userId).subscribe({
        next: (res) => {
          this.toaster.success(res.message, 'promoted');
        },
        error: (error) => {
          this.toaster.error(error.error, 'Failed');
        },
      });
    }
  }
}
