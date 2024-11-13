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
    // Username and password for Basic Authentication
  
  return  this._http.get<any>('/api/Category/Get');
  }
  getByName(name: string): Observable<any> {
    const Username = '11195296';
    const Password = '60-dayfreetrial';
    const encodedCredentials = btoa(`${Username}:${Password}`);
    const headers = new HttpHeaders({
       'Accept': 'application/json',
       'Authorization': `Basic ${encodedCredentials}`,
    });
      return this._http.get<any>("/api/Category/GetByName?name="+name,{headers});
    }
  //create 
    //add
    postData(data: any): Observable<any> {
    
      return this._http.post<any>("/api/Category/Add", data);
    }
      //get by id
      GetById(id:string): Observable<any> {
      
        return this._http.get<any>("/api/Category/GetById?id="+id);
      }
     //update
    updateData(id:string,data: any): Observable<any> {
    
      return this._http.patch<any>("/api/Category/Update?id="+id, data);
    }
  
     //delete
     deleteData(id: number): Observable<void> {
    
      return this._http.delete<void>("/api/Category/Delete?id="+id);
    }
}