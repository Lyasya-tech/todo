import { NgModule, inject } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TaskListComponent } from "./task-list/task-list.component";
import { TaskEditComponent } from "./task-edit/task-edit.component";
import { UsersComponent } from "./users/users.component";
import { taskResolver } from "./task-list/task.resolver";


const appRoutes: Routes = [
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    { path: 'users', component: UsersComponent },
    { path: 'tasks', component: TaskListComponent, children: [
            { path: 'new-task', component: TaskEditComponent, data: { editMode: 'new' } },
            { path: 'edit-task/:id', component: TaskEditComponent }
            
        ]
    },
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}

