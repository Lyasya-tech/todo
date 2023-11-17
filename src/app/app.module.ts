import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { UsersComponent } from './users/users.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TaskService } from './task-list/task.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { TaskItemComponent } from './task-list/task-item/task-item.component';
import { taskResolver } from './task-list/task.resolver';
import { UserItemComponent } from './users/user-item/user-item.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserService } from './users/user.service';

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
