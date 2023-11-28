import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit, OnDestroy{
  task: Task = {
    id: 0,
    description: '',
    dueDate: '',
    status: ''
  };
  private subscription: Subscription;
  private routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const taskId = +params.get('id');
      this.subscription = this.taskService.getTaskById(taskId).subscribe({
        next: task => {
          console.log('details component fetch task by ID')
        this.task = task;
      }, error: errMessage => {
        console.error('no task was fetched', errMessage);
      }
    });
    });
  }

  deleteTask(id: number) {
    const confirmDelete = confirm('Are you sure you want to delete this task?');

    if (confirmDelete) {
      this.taskService.deleteTask(id).subscribe(() => { }),
      this.router.navigate(['/']);
    }
  }

  assignTaskToUser(){
    this.router.navigate(['/assignments'], { queryParams: { taskId: this.task.id } });
  }

  closeTaskDetails(){
    this.router.navigate(['/tasks']);
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    // this.subscription.unsubscribe();
  }

}

