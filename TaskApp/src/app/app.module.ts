import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeDashboardComponent } from './employeeComponents/employee-dashboard/employee-dashboard.component';
import { EmployeeHeaderComponent } from './employeeComponents/employee-header/employee-header.component';
import { AdminDashboardComponent } from './adminComponents/admin-dashboard/admin-dashboard.component';
import { AdminHeaderComponent } from './adminComponents/admin-header/admin-header.component';
import { ManagerHeaderComponent } from './managerComponents/manager-header/manager-header.component';
import { ManagerDashboardComponent } from './managerComponents/manager-dashboard/manager-dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateTaskComponent } from './managerComponents/create-task/create-task.component';
import { ViewTeamComponent } from './managerComponents/view-team/view-team.component';
import { ViewTaskComponent } from './adminComponents/view-task/view-task.component';
import { ViewManagersComponent } from './adminComponents/view-managers/view-managers.component';
import { ViewTeamMembersComponent } from './adminComponents/view-team-members/view-team-members.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MyTasksComponent } from './employeeComponents/my-tasks/my-tasks.component';
import { MyManagerComponent } from './employeeComponents/my-manager/my-manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { ViewMyTaskComponent } from './managerComponents/view-my-task/view-my-task.component';
import { UnathourizedComponent } from './unathourized/unathourized.component';
import { ToastrModule } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeletedListsComponent } from './adminComponents/deleted-lists/deleted-lists.component';
import { AssignTeamComponent } from './adminComponents/assign-team/assign-team.component';
@NgModule({
  declarations: [
    AppComponent,
    EmployeeDashboardComponent,
    EmployeeHeaderComponent,
    AdminDashboardComponent,
    AdminHeaderComponent,
    ManagerHeaderComponent,
    ManagerDashboardComponent,
    CreateTaskComponent,
    ViewTeamComponent,
    ViewTaskComponent,
    ViewManagersComponent,
    ViewTeamMembersComponent,
    MyTasksComponent,
    MyManagerComponent,
    LoginComponent,
    RegistrationComponent,
    ViewMyTaskComponent,
    UnathourizedComponent,
    DeletedListsComponent,
    AssignTeamComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatRadioModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
    }),
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
