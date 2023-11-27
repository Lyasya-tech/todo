import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskEditComponent } from './task-list/task-edit/task-edit.component';
import { TaskDetailComponent } from './task-list/task-detail/task-detail.component';
import { UsersComponent } from './users/users.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TaskService } from './services/task.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { TaskItemComponent } from './task-list/task-item/task-item.component';
import { taskResolver } from './task-list/task.resolver';
import { UserItemComponent } from './users/user-item/user-item.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserService } from './users/user.service';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AssignmentItemComponent } from './assignments/assignment-item/assignment-item.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AssignmentEditComponent } from './assignments/assignment-edit/assignment-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
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
