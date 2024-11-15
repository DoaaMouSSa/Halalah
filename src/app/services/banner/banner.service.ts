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
    const url = `${this.apiUrl}Advertisement/Get`;

  return  this._http.get<any>(url);
  }
  //create 
    //add
    postData(data: any): Observable<any> {
      const url = `${this.apiUrl}Advertisement/Add`;

      return this._http.post<any>(url, data);
    }
      //get by id
      GetById(id:string): Observable<any> {
        const url = `${this.apiUrl}Advertisement/GetById?id=`+id;
        return this._http.get<any>(url);
      }
     //update
    updateData(id:string,data: any): Observable<any> {
      const url = `${this.apiUrl}Advertisement/Update?id=`+id;
      return this._http.patch<any>(url, data);
    }
  
     //delete
     deleteData(id: number): Observable<void> {
      const url = `${this.apiUrl}Advertisement/Delete?id=`+id;
      return this._http.delete<void>(url);
    }
}
