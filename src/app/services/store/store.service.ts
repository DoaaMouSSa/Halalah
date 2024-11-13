import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private _http: HttpClient) {}

  getData(pageNumber: number, pageSize: number) : Observable<any>{
   
    const body = {
      pageNumber: pageNumber,
      pageSize: pageSize,
      categoryId: 0, // Adjust this if needed
      filteredDiscount: false,
      filteredLatest: false
    };
    return this._http.post<any>(`api/Store/GetByPageNumber`, body);
  }
  //create 
    //add
    postData(data: any): Observable<any> {
 
      return this._http.post<any>(`api/Store/Add`, data);
    }
      //get by id
      GetById(id:string): Observable<any> {
   
        return this._http.get<any>(`api/Store/GetById?id=`+id);
      }
     //update
    updateData(id:string,data: any): Observable<any> {
    
      return this._http.put<any>(`api/Store/Update?id=`+id, data);
    }
  
     //delete
     deleteData(id: number): Observable<void> {
   
      return this._http.delete<void>(`api/Store/Delete?id=`+id);
    }
}
