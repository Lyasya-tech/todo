import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task: Task;
  @Input() id: number;

  constructor(
    private taskService: TaskService
  ) { }

  getStatusClass(task: Task) {
    return {
      'complete': task.status === 'complete',
      'not-started': task.status === 'not started'
    }
  }

  deleteTask(id: number) {
    const confirmDelete = confirm('Are you sure you want to delete this task?');

    if (confirmDelete) {
      this.taskService.deleteTask(id).subscribe(() => { })
    }
  }
}
