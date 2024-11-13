import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CouponService {
  constructor(private _http: HttpClient) {}

  getData() : Observable<any>{
 
  return  this._http.get<any>('/api/Coupon/Get');
  }
  getDataRemoved() : Observable<any>{
 
  return  this._http.get<any>('/api/Coupon/GetDeletedCoupons');
  }
  //create 
    //add
    postData(data: any): Observable<any> {
      return this._http.post<any>("/api/Coupon/Add", data);
    }
      //get by id
      GetById(id:string): Observable<any> {
        return this._http.get<any>("/api/Coupon/GetById?id="+id);
      }
     //update
    updateData(id:string,data: any): Observable<any> {
      return this._http.put<any>("/api/Coupon/Update?id="+id, data);
    }
  
     //delete
     deleteData(id: number): Observable<void> {

      return this._http.delete<void>("/api/Coupon/Delete?id="+id);
    }
      //remove delete
      removeDeleteData(id: number): Observable<void> {
    
        return this._http.put<void>("/api/Coupon/RemoveDelete?id="+id,{});
      }
}

