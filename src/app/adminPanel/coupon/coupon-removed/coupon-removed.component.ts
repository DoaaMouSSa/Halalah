import { Component, OnInit } from '@angular/core';
import { CouponService } from '../../../services/coupon/coupon.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-coupon-removed',
  templateUrl: './coupon-removed.component.html',
  styleUrl: './coupon-removed.component.css'
})
export class CouponRemovedComponent implements OnInit{
  data: any;

  constructor(private _couponService: CouponService,private _router:Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this._couponService.getDataRemoved().subscribe(
      (response: any) => { // Explicitly type response
        this.data = response.payload; // Assign the data to the property
      },
      (error: HttpErrorResponse) => { // Explicitly type error
        console.error('Error fetching data:', error);
      }
    );
  }
 
  goToActivateData(id:any){
    this._couponService.removeDeleteData(id).subscribe(
      (response) => {
        this.loadData();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
