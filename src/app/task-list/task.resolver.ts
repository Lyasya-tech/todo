import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { TaskService } from "./task.service";
import { catchError, map, of, tap } from "rxjs";

export const taskResolver: ResolveFn<any> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    console.log('resolver started');

    return inject(TaskService).getTaskListUpdates().pipe(
      tap(updatedTasks => {

        console.log('Fetched Data:', updatedTasks);
        console.log(typeof updatedTasks)

      }),
      catchError(error => {
        console.error('Error fetching data:', error);
        return of(null); // Handle the error gracefully
      }),
      map(updatedTasks => ({ resolvedTasks: updatedTasks }))
  );
};