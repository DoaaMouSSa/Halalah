import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  constructor(private _http: HttpClient) {}

  getData() : Observable<any>{

  return  this._http.get<any>('/api/Statistics/Get');
  }
}