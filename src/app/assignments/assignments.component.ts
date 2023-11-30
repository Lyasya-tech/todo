import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Assignment } from '../models/assignment.model'; 
import { AssignmentService } from './assignment.service'; 
import { User } from '../models/user.model';
import { Task } from '../models/task.model';
import { UserService } from '../users/user.service';
import { TaskService } from '../services/task.service';

@Component({
    selector: 'app-assignments', 
    templateUrl: './assignments.component.html', 
    styleUrls: ['./assignments.component.css'] 
})
export class AssignmentsComponent implements OnInit {
  assignments: Assignment[] = []; 
  filteredAssignments: Assignment[] = [];
  subscription: Subscription;

  assignment: Assignment={id:0,  
                          userId: 0,
                          taskId: 0 ,
                          timestamp: new Date().toISOString()}; 
  users: User[] = [];
  tasks: Task[] = [];
  filteredDate: string = "";
  selectedAssignmentId: number= null;
  pdfService: any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private assignmentsService: AssignmentService,
    private userService: UserService,
    private taskService: TaskService,
  ) 
  {
    console.log('constructor initiated');
  }

  ngOnInit() {
    console.log('ngOnInit triggered');
    this.assignmentsService.getAssignmentListUpdates().subscribe(updatedAssignments => { 
      this.filteredAssignments = updatedAssignments; 
    });
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    }); 
    this.route.queryParams.subscribe(params => {
      const taskId = params['taskId'];
      if (taskId) {
        this.assignment.taskId = taskId;
      }
      const userId = params['userId'];
      if (userId) {
        this.assignment.userId = userId;
      }
    });
  }

  createNewAssignment() {
    this.assignmentsService.createAssignment(this.assignment).subscribe(() => {}); 
  }
 
  searchAssignmentsWithDate() {
    this.assignmentsService.searchAssignments(this.filteredDate).subscribe((filteredAssignments) => {
      console.log(filteredAssignments);
      this.filteredAssignments = filteredAssignments;
    });
  }

  getUserName(userId: number){
    const user = this.users.find(user => user.id == userId);
    return user ? user.name : 'Unknown User';
  }

  getTaskDescription(taskId: number){
    const task = this.tasks.find(task => task.id == taskId);
    return task ? task.description : 'Unknown Task';
  }

  navigateToDetails(assignmentId: number){
      this.router.navigate([assignmentId], { relativeTo: this.route });
  }

  onAssignmentSelected(assignmentId: number){
    this.selectedAssignmentId=assignmentId;
  }

  generatePDF() {
    this.pdfService.generatePdf(this.filteredAssignments);
}
}

