import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { ManagerService } from '../services/manager.service';
import { ToastrService } from 'ngx-toastr';
import { AssignTeamService } from '../services/assign-team.service';

@Component({
  selector: 'app-assign-team',
  templateUrl: './assign-team.component.html',
  styleUrls: ['./assign-team.component.scss'],
})
export class AssignTeamComponent implements OnInit {
  assignTeam!: FormGroup;
  employeeList: any[] = [];
  managerList: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private managerService: ManagerService,
    private toaster: ToastrService,
    private assignTeamService: AssignTeamService
  ) {}

  ngOnInit(): void {
    this.getFormValues();
    this.getEmployee();
    this.getManager();
  }

  getFormValues() {
    this.assignTeam = this.formBuilder.group({
      manager: ['', Validators.required],
      employee: ['', Validators.required],
    });
  }

  assignTeamMember() {
    if (confirm('Are you sure you want to assign?')) {
      const value = this.assignTeam.value;

      this.assignTeamService.assignTeamMember(this.assignTeam.value).subscribe({
        next: (res) => {
          console.log(res);
          this.toaster.success('team created', 'success');
        },
        error: (error) => {
          console.error(error.message);
          this.toaster.error('team not created', 'error');
        },
      });
      this.assignTeam.reset();
    }
  }

  getEmployee() {
    this.employeeService.getAllEmployee().subscribe({
      next: (res) => {
        this.employeeList = res.employeeDetails;
      },
      error: (error) => {},
    });
  }

  getManager() {
    this.managerService.getAllManager().subscribe({
      next: (res) => {
        this.managerList = res.ManagerDetails;
      },
      error: (error) => {},
    });
  }
}
