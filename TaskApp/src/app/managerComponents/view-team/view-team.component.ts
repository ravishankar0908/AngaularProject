import { Component, OnInit } from '@angular/core';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.scss'],
})
export class ViewTeamComponent implements OnInit {
  constructor(private teamService: TeamService) {}

  teamList: any[] = [];
  displayedColumns: string[] = [
    'position',
    'fname',
    'lname',
    'email',
    'role',
    'gender',
  ];

  ngOnInit(): void {
    this.getMyTeamMembers();
  }

  getMyTeamMembers() {
    const managerId = localStorage.getItem('userId');

    this.teamService.getTeamDetail(managerId).subscribe({
      next: (res) => {
        this.teamList = res.details.map((item: any) => item.employeeDetail);
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }
}
