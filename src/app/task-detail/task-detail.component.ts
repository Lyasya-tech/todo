import { Component } from '@angular/core';
import { Task } from '../models/task.model';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task-list/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent {
  task: Task = {
    id: 0,
    description: '',
    dueDate: '',
    status: ''
  };
  constructor(private route: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const taskId = +params.get('id');
      this.taskService.getTaskById(taskId).subscribe(task => {
        this.task = task;
      });
    });
  }

  deleteTask(id: number) {
    const confirmDelete = confirm('Are you sure you want to delete this task?');

    if (confirmDelete) {
      this.taskService.deleteTask(id).subscribe(() => { })
    }
  }
}
