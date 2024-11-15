import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  getData(pageNumber: number, pageSize: number) : Observable<any>{
    const url = `${this.apiUrl}Store/GetByPageNumber`;

    const body = {
      pageNumber: pageNumber,
      pageSize: pageSize,
      categoryId: 0, // Adjust this if needed
      filteredDiscount: false,
      filteredLatest: false
    };
    return this._http.post<any>(url, body);
  }
  //create 
    //add
    postData(data: any): Observable<any> {
      const url = `${this.apiUrl}Store/Add`;

      return this._http.post<any>(url, data);
    }
      //get by id
      GetById(id:string): Observable<any> {
        const url = `${this.apiUrl}Store/GetById?id=`+id;
        return this._http.get<any>(url);
      }
     //update
    updateData(id:string,data: any): Observable<any> {
      const url = `${this.apiUrl}Store/Update?id=`+id;

      return this._http.put<any>(url, data);
    }
  
     //delete
     deleteData(id: number): Observable<void> {
      const url = `${this.apiUrl}Store/Delete?id=`+id;
      return this._http.delete<void>(url);
    }
}
