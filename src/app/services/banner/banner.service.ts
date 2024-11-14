import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  getData() : Observable<any>{
  
  return  this._http.get<any>('/api/Advertisement/Get');
  }
  //create 
    //add
    postData(data: any): Observable<any> {
  
      return this._http.post<any>("/api/Advertisement/Add", data);
    }
      //get by id
      GetById(id:string): Observable<any> {
   
        return this._http.get<any>("/api/Advertisement/GetById?id="+id);
      }
     //update
    updateData(id:string,data: any): Observable<any> {
    
      return this._http.patch<any>("/api/Advertisement/Update?id="+id, data);
    }
  
     //delete
     deleteData(id: number): Observable<void> {
   
      return this._http.delete<void>("/api/Advertisement/Delete?id="+id);
    }
}
