import { Component, OnDestroy, OnInit } from '@angular/core';
// import { TaskService } from './task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from './user.service';


@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
   subscription: Subscription;

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) {
      
      console.log('constructor initiated');
    }

  ngOnInit() {
    console.log('ngOnInit triggered')
    this.userService.getUserListUpdates().subscribe(updatedUsers => {
      this.users = updatedUsers;
    });

  }

  createNewUser() {
    this.router.navigate(['new-user'], {relativeTo: this.route});
  }


}