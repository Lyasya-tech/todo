import { Component } from '@angular/core';
import { Assignment } from 'src/app/models/assignment.model';
import { AssignmentService } from '../assignment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assignment-edit',
  templateUrl: './assignment-edit.component.html',
  styleUrls: ['./assignment-edit.component.css']
})
export class AssignmentEditComponent {
    assignment: Assignment = {
    id: 0,
    userId: 0,
    taskId: 0,
    timestamp: ''
};

  editMode: string;
  assignmentService: any;
  constructor(private route: ActivatedRoute, private taskService: AssignmentService) {
    this.editMode = this.route.snapshot.data.editMode;
  }
  ngOnInit() {
    if (this.editMode !== 'new'){
      this.route.parent.params.subscribe(params => {
        const assignmentId = +params['id']; 
        this.assignmentService.getAssignmentById(assignmentId).subscribe({
          next: (assignment: Assignment) => {
          this.assignment = assignment;  
        }, error: errMessage => {
          console.error('no assignment was fetched', errMessage);
        }
      });
      });
    }  
  }

  onFormSubmit() {
    if (this.editMode === 'new') {
        // Create a new assignment
        this.assignmentService.createAssignment(this.assignment).subscribe(newAssignment => {
            // Handle the new assignment as needed (e.g., display success message)
        });
    } else {
        // Update an existing assignment
        this.assignmentService.updateAssignment(this.assignment).subscribe(updatedAssignment => {
            // Handle the updated assignment as needed (e.g., display success message)
        });
    }
}

}
