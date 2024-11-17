import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.apiUrl;
  constructor(private _http: HttpClient) {}
  getData() : Observable<any>{
    const url = `${this.apiUrl}Category/Get`;
  return  this._http.get<any>(url);
  }
  getDataByStore(id:any) : Observable<any>{
    const url = `${this.apiUrl}Category/GetByStore?id=`+id;
  return  this._http.get<any>(url);
  }
  getByName(name: string): Observable<any> {
    const url = `${this.apiUrl}Category/Get`;

   
      return this._http.get<any>("/api/Category/GetByName?name="+name);
    }
  //create 
    //add
    postData(data: any): Observable<any> {
      const url = `${this.apiUrl}Category/Add`;
      return this._http.post<any>(url, data);
    }
      //get by id
      GetById(id:string): Observable<any> {
        const url = `${this.apiUrl}Category/GetById?id=`+id;
        return this._http.get<any>(url);
      }
     //update
    updateData(id:string,data: any): Observable<any> {
      const url = `${this.apiUrl}Category/Update?id=`+id;
      return this._http.patch<any>(url, data);
    }
  
     //delete
     deleteData(id: number): Observable<void> {
      const url = `${this.apiUrl}Category/Delete?id=`+id;
      return this._http.delete<void>(url);
    }
}