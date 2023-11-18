import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Assignment } from '../models/assignment.model'; 


@Injectable({
  providedIn: 'root'
})
export class AssignmentService { 
  private apiUrl = 'http://localhost:3000/assignment'; 
  private assignmentListSubject = new BehaviorSubject<Assignment[]>([]); 

  constructor(private http: HttpClient) {
    this.fetchAndNotifyAssignmentList(); 
  }

  // Fetch and update the assignment list from the server
  private fetchAndNotifyAssignmentList() {
    this.http.get<Assignment[]>(this.apiUrl).subscribe(assignments => { 
      this.assignmentListSubject.next(assignments); 
    });
  }
  
  // Subscribe to assignment list updates
  getAssignmentListUpdates(): Observable<Assignment[]> { 
    return this.assignmentListSubject.asObservable(); 
  }

  // Retrieve all assignments
  getAssignments(): Observable<Assignment[]> { 
    return this.http.get<Assignment[]>(this.apiUrl); 
  }

  // Create a new assignment
  createAssignment(assignment: Assignment): Observable<Assignment> { 
    return this.http.post<Assignment>(this.apiUrl, assignment).pipe(
      tap(createdAssignment => {
        // After a successful update, fetch and notify the updated Assignment list
        this.fetchAndNotifyAssignmentList(); 
      }));
  }

  // Update an existing assignment
  updateAssignment(assignment: Assignment): Observable<Assignment> { 
    const url = `${this.apiUrl}/${assignment.id}`; 
    return this.http.put<Assignment>(url, assignment).pipe(
      tap(updatedAssignment => {
        // After a successful update, fetch and notify the updated assignment list
        this.fetchAndNotifyAssignmentList(); 
      }));
  }

  // Delete an assignment by ID
  deleteAssignment(assignmentId: number): Observable<void> { 
    const url = `${this.apiUrl}/${assignmentId}`; 
    return this.http.delete<void>(url).pipe(
      tap(() => {
        // After a successful update, fetch and notify the updated assignment list
        this.fetchAndNotifyAssignmentList(); 
      }));
  }

  getAssignmentById(assignmentId: number): Observable<Assignment> { 
    const url = `${this.apiUrl}/${assignmentId}`; 
    console.log(url);
    return this.http.get<Assignment>(url); 
  }
}
