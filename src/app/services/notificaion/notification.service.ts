import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  getData() : Observable<any>{
    const url = `${this.apiUrl}Notification/Get`;

  return  this._http.get<any>(url);
  }
  //create 
    //add
    postData(data: any): Observable<any> {
      const url = `${this.apiUrl}Notification/PushNotification`;
      return this._http.post<any>(url, data);
    }

}

