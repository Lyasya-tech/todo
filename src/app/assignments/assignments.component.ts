import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Assignment } from '../models/assignment.model'; 
import { AssignmentService } from './assignment.service'; 

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
                          timestamp: new Date().toISOString()} 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private assignmentsService: AssignmentService
  ) 
  {
    console.log('constructor initiated');
  }

  ngOnInit() {
    console.log('ngOnInit triggered');
    this.assignmentsService.getAssignmentListUpdates().subscribe(updatedAssignments => { 
      this.assignments = updatedAssignments; 
    });
  }

  createNewAssignment() {
    this.assignmentsService.createAssignment(this.assignment).subscribe(() => {}); 
  }
}

