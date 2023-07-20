import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _http: HttpClient) { }

  addTask(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/tasks', data);
  }

  updateTask(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/tasks/${id}`, data);
  }

  getTasksList(): Observable<Task[]> {
    return this._http.get<Task[]>('http://localhost:3000/tasks');
  }

  getProjectTasks(projectId: string): Observable<Task[]> {
    return this._http.get<Task[]>(`http://localhost:3000/tasks?projectId=${projectId}`);
  }

  getFunctionalityTasks(functionalityId: string): Observable<Task[]> {
    return this._http.get<Task[]>(`http://localhost:3000/tasks?functionalityId=${functionalityId}`);
  }

  getTask(id: number): Observable<Task> {
    return this._http.get<Task>(`http://localhost:3000/tasks/${id}`);
  }
  deleteTask(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/tasks/${id}`);
  }
}
