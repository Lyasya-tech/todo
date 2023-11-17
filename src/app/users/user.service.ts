import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user'; 
  private userListSubject = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) {
    this.fetchAndNotifyUserList();
  }

  // Fetch and update the user list from the server
  private fetchAndNotifyUserList() {
    this.http.get<User[]>(this.apiUrl).subscribe(users => {
      this.userListSubject.next(users);
    });
  }
  
  // Subscribe to user list updates
  getUserListUpdates(): Observable<User[]> {
    return this.userListSubject.asObservable();
  }

  // Retrieve all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Create a new user
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      tap(createdUser => {
        // After a successful update, fetch and notify the updated User list
        this.fetchAndNotifyUserList()}));
  }

  // Update an existing user
  updateUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.put<User>(url, user).pipe(
      tap(updatedUser => {
        // After a successful update, fetch and notify the updated user list
        this.fetchAndNotifyUserList()}));
  }

  // Delete a user by ID
  deleteUser(userId: number): Observable<void> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<void>(url).pipe(
      tap(updatedUser => {
        // After a successful update, fetch and notify the updated user list
        this.fetchAndNotifyUserList()}));
  }

  getUserById(userId: number): Observable<User> {
    const url = `${this.apiUrl}/${userId}`;
    console.log(url);
    return this.http.get<User>(url);
  }

  
};


