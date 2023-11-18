import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Assignment } from '../models/assignment.model'; 
import { AssignmentService } from './assignment.service'; 
import { User } from '../models/user.model';
import { Task } from '../models/task.model';
import { UserService } from '../users/user.service';

@Component({
    selector: 'app-assignments', 
    templateUrl: './assignments.component.html', 
    styleUrls: ['./assignments.component.css'] 
})
export class AssignmentsComponent implements OnInit {
  assignments: Assignment[] = []; 
  subscription: Subscription;

  assignment: Assignment={id:0,  
                          userId: 0,
                          taskId: 0 ,
                          timestamp: new Date().toISOString()}; 
  users: User[] = [];
  task: Task;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private assignmentsService: AssignmentService,
    private userService: UserService
  ) 
  {
    console.log('constructor initiated');
  }

  ngOnInit() {
    console.log('ngOnInit triggered');
    this.assignmentsService.getAssignmentListUpdates().subscribe(updatedAssignments => { 
      this.assignments = updatedAssignments; 
    });
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  createNewAssignment() {
    this.assignmentsService.createAssignment(this.assignment).subscribe(() => {}); 
  }

  getUserName(userId: number){
    const user = this.users.find(user => user.id == userId);
    return user ? user.name : 'Unknown User';
  }
}

