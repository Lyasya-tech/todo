import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from '../models/task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  subscription: Subscription;
  searchQuery: string = '';
  filteredTasks: Task[] = [];

  constructor(private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute) {
      
      console.log('constructor initiated');

/*       this.route.data.subscribe(data => {
        console.log('Resolved Data:', data.resolvedTasks.resolvedTasks);
        console.log(typeof data.resolvedTasks)

        this.tasks = data.resolvedTasks.resolvedTasks; // Set this.tasks when the data is available

      }); */

    }

  ngOnInit() {
    console.log('ngOnInit triggered')
    this.subscription = this.taskService.getTaskListUpdates().subscribe(updatedTasks => {
      // this.tasks = updatedTasks;
      this.filteredTasks = updatedTasks;
    });

/*     this.taskService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
    }); */
  }

  createNewTask() {
    this.router.navigate(['new-task'], {relativeTo: this.route});
  }

  searchTasks() {
    this.taskService.searchTasks(this.searchQuery).subscribe(filteredTasks => {
      this.filteredTasks = filteredTasks;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}