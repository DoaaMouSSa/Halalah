import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl = environment.apiUrl;
  constructor(private _http: HttpClient) {}
  getData(pageNumber: number, pageSize: number) : Observable<any>{
   
    const body = {
      pageNumber: pageNumber,
      pageSize: pageSize,
    };
    const url = `${this.apiUrl}Offer/Get`;

    return this._http.post<any>(url, body);
  }

    //add
    postData(data: any): Observable<any> {
      const url = `${this.apiUrl}Offer/Add`;

      return this._http.post<any>(url, data);
    }
      //get by id
      GetById(id:string): Observable<any> {
        const url = `${this.apiUrl}Offer/GetById?id=`+id;
        return this._http.get<any>(url);
      }
     //update
    updateData(id:string,data: any): Observable<any> {
      const url = `${this.apiUrl}Offer/Update?id=`+id;

      return this._http.patch<any>(url,{});
    }
  
     //delete
     deleteData(id: number): Observable<void> {
      const url = `${this.apiUrl}Offer/Delete?id=`+id;

      return this._http.delete<void>(url);
    }
}