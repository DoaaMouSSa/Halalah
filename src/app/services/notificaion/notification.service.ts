import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private _http: HttpClient) {}

  getData() : Observable<any>{
    
  return  this._http.get<any>('/api/Notification/Get');
  }
  //create 
    //add
    postData(data: any): Observable<any> {
   
      return this._http.post<any>("/api/Notification/PushNotification", data);
    }

}

