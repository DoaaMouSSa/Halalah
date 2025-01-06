import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

private apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  getData(pageNumber: number, pageSize: number, name:string) : Observable<any>{
    const url = `${this.apiUrl}Search/Get?name=`+name;

    const body = {
      pageNumber: pageNumber > 0 ? pageNumber : 1,  // Ensure pageNumber is >= 1
      pageSize: pageSize > 0 ? pageSize : 5,        // Ensure pageSize is valid
    };
  
    return this._http.post<any>(url, body);
  }
   //remove
   deleteData(id: number): Observable<void> {
    const url = `${this.apiUrl}Search/Delete?id=`+id;
    return this._http.delete<void>(url);
  }
    //remove all
    deleteAll(): Observable<void> {
      const url = `${this.apiUrl}Search/DeleteAll`;
      return this._http.delete<void>(url);
    }
}
