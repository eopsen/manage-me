import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunctionalityService {

  constructor(private _http: HttpClient) { }

  addFunctionality(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/functionalities', data);
  }

  updateFunctionality(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/functionalities/${id}`, data);
  }

  getFunctionalitiesList(projectId: string): Observable<any> {
    if (projectId != '') {
      return this._http.get(`http://localhost:3000/functionalities?projectId=${projectId}`);
    }
    return this._http.get('http://localhost:3000/functionalities');
  }

  getFunctionality(id: string): Observable<any> {
    return this._http.get(`http://localhost:3000/functionalities/${id}`);
  }
  deleteFunctionality(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/functionalities/${id}`);
  }
}
