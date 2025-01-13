import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { toastMessage } from 'src/app/toastMessage';

@Component({
  selector: 'app-deleted-lists',
  templateUrl: './deleted-lists.component.html',
  styleUrls: ['./deleted-lists.component.scss'],
})
export class DeletedListsComponent implements OnInit {
  constructor(
    private userService: UserService,
    private toaster: ToastrService
  ) {}

  deletedUser: any[] = [];
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
    this.userService.getAllDeletedUsers().subscribe({
      next: (res) => {
        this.deletedUser = res.userDetails;
      },
      error: (error) => {},
    });
  }

  addUser(id: any) {
    if (confirm('Are you sure you want to reset the user?')) {
      this.userService.resetUser(id).subscribe({
        next: (res) => {
          this.toaster.success(res.message, toastMessage.successTitle);
        },
        error: (error) => {
          this.toaster.error(toastMessage.notReseted, toastMessage.errorTitle);
        },
      });
    }
  }
}
