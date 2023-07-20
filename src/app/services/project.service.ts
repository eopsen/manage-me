import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _http: HttpClient) { }

  addProject(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/projects', data);
  }

  updateProject(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/projects/${id}`, data);
  }

  getProjectsList(): Observable<any> {
    return this._http.get('http://localhost:3000/projects');
  }

  getProject(id: number): Observable<any> {
    return this._http.get(`http://localhost:3000/projects/${id}`);
  }

  deleteProject(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/projects/${id}`);
  }
}
