import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { Task } from '../models/task.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/task'; 
  private taskListSubject = new BehaviorSubject<Task[]>([]);

  constructor(private http: HttpClient) {
    this.fetchAndNotifyTaskList();
  }

  // Fetch and update the task list from the server
  private fetchAndNotifyTaskList() {
    this.http.get<Task[]>(this.apiUrl).subscribe(tasks => {
      this.taskListSubject.next(tasks);
    });
  }
  
  // Subscribe to task list updates
  getTaskListUpdates(): Observable<Task[]> {
    return this.taskListSubject.asObservable();
  }

  // Retrieve all tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Create a new task
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      tap(() => {
        // After a successful update, fetch and notify the updated task list
        this.fetchAndNotifyTaskList()}));
  }

  // Update an existing task
  updateTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task).pipe(
      tap(() => {
        // After a successful update, fetch and notify the updated task list
        this.fetchAndNotifyTaskList()}));
  }

  // Delete a task by ID
  deleteTask(taskId: number): Observable<void> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.delete<void>(url).pipe(
      tap(() => {
        // After a successful update, fetch and notify the updated task list
        this.fetchAndNotifyTaskList()}));
  }

  getTaskById(taskId: number): Observable<Task> {
    const url = `${this.apiUrl}/${taskId}`;
    console.log(url);
    return this.http.get<Task>(url);
  }

  // Filter tasks based on the query
  searchTasks(query: string): Observable<Task[]> {
    return this.getTasks().pipe(
      map(tasks => {
        return tasks.filter(task =>
          task.description.toLowerCase().includes(query.toLowerCase())
        );
      })
    );
  }

  // Perform filtering based on the due date
  filterTasksByDueDate(): Observable<Task[]> {
    const today = new Date();
/*     const params = { today };
    return this.http.get<Task[]>(this.apiUrl, { params }); */
    return this.getTasks().pipe(
      map(tasks => {
        return tasks.filter(task => new Date(task.dueDate) <= today);
      })
    );
  }
  
};


