import { Component, ViewChild } from '@angular/core';
import { User } from '../models/user.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../users/user.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
    user: User = {
        id: 0,
        name: '',
        email: '',
        role: ''
    };

    editMode: string;

    constructor(private route: ActivatedRoute, private userService: UserService) {
        this.editMode = this.route.snapshot.data.editMode;
    }

    ngOnInit() {
        if (this.editMode !== 'new'){
          this.route.parent.params.subscribe(params => {
            const userId = +params['id']; // Get the user ID from the route parameter
            console.log(userId);
            this.userService.getUserById(userId).subscribe((user: User) => {
              this.user = user;  // Fetch user by ID
            });
          });
        }  
      }  

      onFormSubmit() {
        if (this.editMode === 'new') {
          // Create a new user
          this.userService.createUser(this.user).subscribe(newUser => {
            // Handle the new user as needed (e.g., display success message)
          });
        } else {
          // Update an existing user
          this.userService.updateUser(this.user).subscribe(updatedUser => {
            // Handle the updated user as needed (e.g., display success message)
          });
        }

      }
}
