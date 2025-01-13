import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamService } from '../services/team.service';
import { TaskService } from '../services/task.service';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  taskFormValues!: FormGroup;

  teamList: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.taskFormValues = this.formBuilder.group({
      name: ['', [Validators.required]],
      employeeId: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.getTeamList();
  }

  assignTask() {
    const managerId = localStorage.getItem('userId');

    console.log(this.taskFormValues.value);

    this.taskService.postTask(managerId, this.taskFormValues.value).subscribe({
      next: (res) => {
        alert(res.message);
        console.log(res.taskDetail);
      },
      error: (error) => {
        if (error.status === 400) {
          console.log(error.message);
        } else if (error.status === 500) {
          console.log(error.message);
        }
      },
    });
    this.taskFormValues.reset();
  }

  getTeamList() {
    const userId = localStorage.getItem('userId');

    this.teamService.getTeamDetail(userId).subscribe({
      next: (res) => {
        this.teamList = res.details.map((item: any) => item.employeeDetail);
      },
      error: (error) => {
        if (error.status === 400) {
          console.log(error.message);
        }
      },
    });
  }
}
