import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { UsersComponent } from './users/users.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TaskService } from './services/task.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { TaskItemComponent } from './tasks/task-item/task-item.component';
import { taskResolver } from './tasks/task.resolver';
import { UserItemComponent } from './users/user-item/user-item.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserService } from './services/user.service';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AssignmentItemComponent } from './assignments/assignment-item/assignment-item.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { AssignmentEditComponent } from './assignments/assignment-edit/assignment-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskEditComponent,
    TaskDetailComponent,
    UsersComponent,
    NavigationComponent,
    DropdownDirective,
    TaskItemComponent,
    UserItemComponent,
    UserEditComponent,
    AssignmentsComponent,
    AssignmentItemComponent,
    AssignmentDetailComponent,
    UserDetailComponent,
    AssignmentEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [TaskService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
