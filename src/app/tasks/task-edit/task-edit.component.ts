import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../models/task.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit, OnDestroy {
  task: Task = {
    id: 0,
    description: '',
    dueDate: '',
    status: ''
  };
  editMode: string;
  // @ViewChild('editTaskForm', {static: false}) editTaskForm: NgForm;
  private subscription: Subscription;
  private routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {
    this.editMode = this.route.snapshot.data.editMode;
  }

  ngOnInit() {
    if (this.editMode !== 'new') {
      this.routeSubscription = this.route.parent.params.subscribe(params => {
        const taskId = +params['id'];
        this.subscription = this.taskService.getTaskById(taskId).subscribe({
          next: (task: Task) => {
            console.log('edit component getTaskById')
            this.task = task;
          }, error: errMessage => {
            console.error('no task was fetched', errMessage);
          }
        });
      });
    }
  }

  onFormSubmit() {
    if (this.editMode === 'new') {
      this.taskService.createTask(this.task).subscribe(newTask => {
      });
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      this.taskService.updateTask(this.task).subscribe(updatedTask => {
      });
      this.router.navigate(['../../'], { relativeTo: this.route });
    }
    /*     this.taskService.updateTask(this.task).subscribe(updatedTask => {
          this.task = updatedTask;
        }); */
  }

  cancelForm() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    console.log('edit component ng destroy triggered');
/*     this.routeSubscription.unsubscribe();
    this.subscription.unsubscribe(); */
  }

}

// this.route.paramMap.subscribe((params: ParamMap) => {
// const taskId = +params.get('id'); // Get the task ID from the route parameter