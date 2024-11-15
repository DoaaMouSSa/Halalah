import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  getData() : Observable<any>{
    const url = `${this.apiUrl}Coupon/Get`;

  return  this._http.get<any>(url);
  }
  getDataRemoved() : Observable<any>{
    const url = `${this.apiUrl}Coupon/GetDeletedCoupons`;

  return  this._http.get<any>(url);
  }
  //create 
    //add
    postData(data: any): Observable<any> {
      const url = `${this.apiUrl}Coupon/Add`;
      return this._http.post<any>(url, data);
    }
      //get by id
      GetById(id:string): Observable<any> {
        const url = `${this.apiUrl}Coupon/GetById?id=`+id;
        return this._http.get<any>(url);
      }
     //update
    updateData(id:string,data: any): Observable<any> {
      const url = `${this.apiUrl}Coupon/Update?id=`+id;
      return this._http.put<any>(url, data);
    }
  
     //delete
     deleteData(id: number): Observable<void> {
      const url = `${this.apiUrl}Coupon/Delete?id=`+id;
      return this._http.delete<void>(url);
    }
      //remove delete
      removeDeleteData(id: number): Observable<void> {
        const url = `${this.apiUrl}Coupon/RemoveDelete?id=`+id;
        return this._http.put<void>(url,{});
      }
}

