import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { UserPdfService } from './user-pdf.service';


@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    users: User[] = [];
    subscription: Subscription;
    searchQuery: string = '';
    filteredUsers: User[] = [];
    selectedUserId: number = null;

    constructor(private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private pdfService: UserPdfService
    ) {

    }

    ngOnInit() {
        this.subscription = this.userService.getUserListUpdates().subscribe(updatedUsers => {
            this.filteredUsers = updatedUsers;
        });

    }

    createNewUser() {
        this.router.navigate(['/users/new-user']);
    }

    searchUsers() {
        this.userService.searchUsers(this.searchQuery).subscribe(filteredUsers => {
            this.filteredUsers = filteredUsers;
        });
    }

    onUserSelected(userId: number) {
        this.selectedUserId = userId;
    };

    generatePDF() {
        this.pdfService.generatePdf(this.filteredUsers);
    }
}