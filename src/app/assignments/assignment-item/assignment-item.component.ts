import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from 'src/app/models/assignment.model';
import { Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';
import { AssignmentService } from '../../services/assignment.service';
import { UserService } from 'src/app/users/user.service';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'tr[assignmentItem]',
  templateUrl: './assignment-item.component.html',
  styleUrls: ['./assignment-item.component.css']
})
 
export class AssignmentItemComponent implements OnInit{
  @Input() assignment: Assignment;
  @Output() assignmentSelected : EventEmitter<number>=new EventEmitter<number>();
  users: User[] = [];
  tasks: Task[] = [];

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
    
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
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

  deleteAssignment(id: number) {
    const confirmDelete = confirm('Are you sure you want to delete this assignment?');

    if (confirmDelete) {
      this.assignmentsService.deleteAssignment(id).subscribe(() => { })
    }
  }

  emitSelectedAssignment() {
    this.assignmentSelected.emit(this.assignment.id);
  } 

}
