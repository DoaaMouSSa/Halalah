import { Component, OnInit } from '@angular/core';
import { CouponService } from '../../../services/coupon/coupon.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-coupon-index',
  templateUrl: './coupon-index.component.html',
  styleUrl: './coupon-index.component.css'
})
export class CouponIndexComponent implements OnInit{
  data: any;

  constructor(private _couponService: CouponService,private _router:Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this._couponService.getData().subscribe(
      (response: any) => { // Explicitly type response
        this.data = response.payload; // Assign the data to the property
      },
      (error: HttpErrorResponse) => { // Explicitly type error
        console.error('Error fetching data:', error);
      }
    );
  }
  goToUpdatedPage(id:number){
    this._router.navigate(['/dashboard/coupon/edit/'+id]);
    }
  goToDeleteData(id:any){
    this._couponService.deleteData(id).subscribe(
      (response) => {
        this.loadData();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}

