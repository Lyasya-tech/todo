import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent {
    @Input() user: User;
    @Input() id: number;
    @Output() userSelected: EventEmitter<number> = new EventEmitter<number>();

    constructor(
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
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

  navigateToDetails(userId: number) {
    this.router.navigate([userId], {relativeTo: this.route });
  }

  emitSelectedTask() {
    this.userSelected.emit(this.user.id);
  }

}
