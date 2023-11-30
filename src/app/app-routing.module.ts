import { NgModule, inject } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";
import { TaskEditComponent } from "./tasks/task-edit/task-edit.component";
import { UsersComponent } from "./users/users.component";
import { taskResolver } from "./tasks/task.resolver";
import { UserEditComponent } from "./users/user-edit/user-edit.component";
import { AssignmentsComponent } from "./assignments/assignments.component";
import { TaskDetailComponent } from "./tasks/task-detail/task-detail.component";
import { AssignmentDetailComponent } from "./assignments/assignment-detail/assignment-detail.component";
import { UserDetailComponent } from "./users/user-detail/user-detail.component";
import { AssignmentEditComponent } from "./assignments/assignment-edit/assignment-edit.component";


const appRoutes: Routes = [
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    { path: 'users', component: UsersComponent, children: [
        { path: 'new-user', component: UserEditComponent, data: { editMode: 'new' } },
        { path: ':id', component: UserDetailComponent, children: [
        { path: 'edit', component: UserEditComponent} ] },
        ]
    },
    { path: 'assignments', component: AssignmentsComponent, children: [
             {path: ':id', component: AssignmentDetailComponent},
              {path: ':id/edit', component: AssignmentEditComponent} ] },
    { path: 'tasks', component: TasksComponent, children: [
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

