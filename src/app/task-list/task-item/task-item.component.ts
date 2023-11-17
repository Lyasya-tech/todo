import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task: Task;
  @Input() id: number;
  @Output() onButtonClick: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  getStatusClass(task: Task) {
    return {
      'complete': task.status === 'complete',
      'not-started': task.status === 'not started',
      'in-progress': task.status === 'in progress'
    }
  }

  navigateToDetails(taskId: number){
    this.router.navigate([taskId], { relativeTo: this.route });
  }

  deleteTask(id: number) {
    const confirmDelete = confirm('Are you sure you want to delete this task?');

    if (confirmDelete) {
      this.taskService.deleteTask(id).subscribe(() => { })
    }
  }

  emitButtonClick() {
    this.onButtonClick.emit(this.task.id);
  }

}
