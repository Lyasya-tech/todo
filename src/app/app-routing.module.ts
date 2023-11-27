import { NgModule, inject } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TaskListComponent } from "./task-list/task-list.component";
import { TaskEditComponent } from "./task-edit/task-edit.component";
import { UsersComponent } from "./users/users.component";
import { taskResolver } from "./task-list/task.resolver";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { AssignmentsComponent } from "./assignments/assignments.component";
import { TaskDetailComponent } from "./task-detail/task-detail.component";
import { AssignmentDetailComponent } from "./assignments/assignment-detail/assignment-detail.component";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { AssignmentEditComponent } from "./assignments/assignment-edit/assignment-edit.component";


const appRoutes: Routes = [
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    { path: 'users', component: UsersComponent, children: [
        { path: 'new-user', component: UserEditComponent, data: { editMode: 'new' } },
       // { path: 'edit-user/:id', component: UserEditComponent }
       { path: ':id', component: UserDetailComponent, children: [
        {path: 'edit', component: UserEditComponent} ] },
        ]
    },
    { path: 'assignments', component: AssignmentsComponent, children: [
             {path: ':id', component: AssignmentDetailComponent},
              {path: ':id/edit', component: AssignmentEditComponent} ] },
    { path: 'tasks', component: TaskListComponent, children: [
            { path: 'new-task', component: TaskEditComponent, data: { editMode: 'new' } },
            // { path: 'edit-task/:id', component: TaskEditComponent },
            { path: ':id', component: TaskDetailComponent, children: [
                { path: 'edit', component: TaskEditComponent },
            ] },
        ]
    },
    { path: '**', redirectTo: '/tasks' },
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}

