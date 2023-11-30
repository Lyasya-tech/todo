import { Component } from '@angular/core';
import { UserService } from '../users/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
    user: User = {
        id: 0,
        name: '',
        email: '',
        role: ''
    };

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const userId = +params['id'];
            this.userService.getUserById(userId).subscribe(user => {
                this.user = user;
            });
        })
    }

    deleteUser(id: number) {
        const confirmDelete = confirm('Are you sure you want to delete this user?');

        if (confirmDelete) {
            this.userService.deleteUser(id).subscribe(() => { }),
                this.router.navigate(['/']);
        }
    }

    assignUserToTask() {
        this.router.navigate(['/assignments'], { queryParams: { userId: this.user.id } });
    }

}
