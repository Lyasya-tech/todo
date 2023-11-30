import { Component, OnInit } from '@angular/core';
import { Assignment } from 'src/app/models/assignment.model';
import { AssignmentService } from '../../services/assignment.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TaskService } from 'src/app/services/task.service';



@Component({
  selector: 'app-assignment-edit',
  templateUrl: './assignment-edit.component.html',
  styleUrls: ['./assignment-edit.component.css']
})
export class AssignmentEditComponent implements OnInit{ 
  assignment: Assignment = {
    id: 0,
    userId: 0,
    taskId: 0,
    timestamp: ''
    
  };
  users: any;
  tasks: any;
 
  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private userService: UserService,
    private taskService: TaskService
  ) {
    
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      const assignmentId = +params['id'];
      console.log(assignmentId);
      this.assignmentService.getAssignmentById(assignmentId).subscribe({
        next: (assignment: Assignment) => {
          this.assignment = assignment;
        }, error: errMessage => {
          console.error('no assignment was fetched', errMessage);
        }
      });
    });
    console.log(this.assignment.id);
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });

  }

  onFormSubmit() {
      this.assignmentService.updateAssignment(this.assignment).subscribe(updatedAssignment => {
      });
    }
}
