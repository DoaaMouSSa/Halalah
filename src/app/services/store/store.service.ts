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

  getData(pageNumber: number, pageSize: number, name:string) : Observable<any>{
    const url = `${this.apiUrl}Store/GetByPageNumber`;

    const body = {
      pageNumber: pageNumber > 0 ? pageNumber : 1,  // Ensure pageNumber is >= 1
      pageSize: pageSize > 0 ? pageSize : 5,        // Ensure pageSize is valid
      categoryId: 0,  // Adjust if needed based on your logic
      filteredDiscount: false,  // Adjust based on the filter logic
      filteredLatest: false,    // Adjust based on the filter logic
      name: name.trim() || ""  // Pass the actual name, ensure it's not empty
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
        const url = `${this.apiUrl}Store/GetByIdForEdit?id=`+id;
        return this._http.patch<any>(url,{});
      }
     //update
    updateData(id:string,data: any): Observable<any> {
      const url = `${this.apiUrl}Store/Update`;

      return this._http.patch<any>(url, data);
    }
  
     //delete
     deleteData(id: number): Observable<void> {
      const url = `${this.apiUrl}Store/Delete?id=`+id;
      return this._http.delete<void>(url);
    }
}
