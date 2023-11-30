import { Component } from '@angular/core';
import { Assignment } from 'src/app/models/assignment.model';
import { AssignmentService } from '../../services/assignment.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent {
    assignment: Assignment = {
    id: 0,
    userId: 0,
    taskId: 0,
    timestamp: ''
  };

  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private router: Router
    ) {}

   ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const assignmentId = +params.get('id');
        this.assignmentService.getAssignmentById(assignmentId).subscribe(assignment => {
          this.assignment = assignment;
        });
      });
    }


}
