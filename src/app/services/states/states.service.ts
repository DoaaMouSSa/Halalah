import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class StatesService {

  private apiUrl = environment.apiUrl;
  constructor(private _http: HttpClient) {}
  getData() : Observable<any>{
    const url = `${this.apiUrl}Statistics/Get`;
  return  this._http.get<any>(url);
  }}
