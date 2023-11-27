import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../models/task.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit, OnDestroy{
  task: Task = {
    id: 0,
    description: '',
    dueDate: '',
    status: ''
  };
  editMode: string;
  // @ViewChild('editTaskForm', {static: false}) editTaskForm: NgForm;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private taskService: TaskService) {
    this.editMode = this.route.snapshot.data.editMode;
  }

  ngOnInit() {
    if (this.editMode !== 'new'){
      this.route.parent.params.subscribe(params => {
        const taskId = +params['id']; 
        this.taskService.getTaskById(taskId).subscribe({
          next: (task: Task) => {
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
    } else {
      this.taskService.updateTask(this.task).subscribe(updatedTask => {
      });
    }
/*     this.taskService.updateTask(this.task).subscribe(updatedTask => {
      this.task = updatedTask;
    }); */
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

// this.route.paramMap.subscribe((params: ParamMap) => {
  // const taskId = +params.get('id'); // Get the task ID from the route parameter