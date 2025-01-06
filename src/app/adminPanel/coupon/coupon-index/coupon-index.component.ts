import { Component, OnInit } from '@angular/core';
import { CouponService } from '../../../services/coupon/coupon.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coupon-index',
  templateUrl: './coupon-index.component.html',
  styleUrl: './coupon-index.component.css'
})
export class CouponIndexComponent implements OnInit{
  data: any;
  pageNumber: number = 1;
  pageSize: number = 5;
  totalPages: number = 1000; 
  name:string="";
  constructor(private _couponService: CouponService,private _router:Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this._couponService.getData(this.pageNumber, this.pageSize,this.name).subscribe(
      (response: any) => { // Explicitly type response
        this.data = response.payload; // Assign the data to the property
        this.totalPages = Math.ceil(response.dataCount/5) || 1000;  // Set total pages based on response

      },
      (error: HttpErrorResponse) => { // Explicitly type error
        console.error('Error fetching data:', error);
      }
    );
  }
  searchData(){
    this.pageNumber = 1;
    this.loadData();
  }
  reset() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to reset the coupons data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user clicks "Yes"
        this._couponService.resetData().subscribe(
          (response) => {
            this.loadData(); // Reload data
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      }
      // If the user clicks "Cancel", nothing happens
    });
  }
  
  
  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.pageNumber = newPage;
      this.loadData(); // Load data for the new page
    }
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

