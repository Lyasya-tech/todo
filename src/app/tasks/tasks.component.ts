import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { jsPDF } from 'jspdf';
import { TaskPdfService } from '../services/task-pdf.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  subscription: Subscription;
  searchQuery: string = '';
  filteredTasks: Task[] = [];
  selectedTaskId: number = null;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private pdfService: TaskPdfService
  ) {

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
    this.router.navigate(['new-task'], { relativeTo: this.route });
  }

  searchTasks() {
    this.taskService.searchTasks(this.searchQuery).subscribe(filteredTasks => {
      this.filteredTasks = filteredTasks;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onTaskSelected(taskId: number) {
    this.selectedTaskId = taskId;
  }

  generatePDF() {
    this.pdfService.generatePdf(this.filteredTasks);
/*     const pdf = new jsPDF();

    pdf.text('Task Report', 10, 10);
    this.filteredTasks.forEach((task, index) => {
      const yPos = 20 + index * 10;
      pdf.text(`${task.id}. ${task.description} - ${task.status}`, 10, yPos);
    });

    pdf.save('task_report.pdf'); */
  }

}