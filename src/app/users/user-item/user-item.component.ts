import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent {
    @Input() user: User;
    @Input() id: number;

    constructor(
        private userService: UserService
    ) { }

    getRoleClass(user: User) {
        return{
            'Admin': user.role === 'Admin',
            'Employee': user.role === 'Employee'
        }
    }

    deleteUser(id: number) {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
// abhängigkeiten prüfen? über assignment??

    if (confirmDelete) {
      this.userService.deleteUser(id).subscribe(() => { })
    }
  }

}
