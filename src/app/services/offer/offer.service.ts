import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private _http: HttpClient) {}
  getData(pageNumber: number, pageSize: number) : Observable<any>{
   
    const body = {
      pageNumber: pageNumber,
      pageSize: pageSize,
    };
    return this._http.post<any>(`api/Offer/Get`, body);
  }

    //add
    postData(data: any): Observable<any> {
  
      return this._http.post<any>("/api/Offer/Add", data);
    }
      //get by id
      GetById(id:string): Observable<any> {
      
        return this._http.get<any>("/api/Offer/GetById?id="+id);
      }
     //update
    updateData(id:string,data: any): Observable<any> {
    
      return this._http.patch<any>("/api/Offer/Update?id="+id, data);
    }
  
     //delete
     deleteData(id: number): Observable<void> {
   
      return this._http.delete<void>("/api/Offer/Delete?id="+id);
    }
}