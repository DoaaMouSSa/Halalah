import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store/store.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-store-removed',
  templateUrl: './store-removed.component.html',
  styleUrl: './store-removed.component.css'
})
export class StoreRemovedComponent implements OnInit{
  data: any;
  pageNumber: number = 1;
  pageSize: number = 5;
  totalPages: number = 1000; // Total pages based on API response
  name: string = "";  // Bind the 'name' variable to the input field

  constructor(private _storeService: StoreService,private _router:Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
      this._storeService.getDataRemoved(this.pageNumber, this.pageSize, this.name).subscribe(
        (response: any) => {  // Handle the response
          this.data = response.payload;  // Assign the stores data
          this.totalPages = response.totalPages || 1000;  // Set total pages based on response
        },
      (error: HttpErrorResponse) => { // Explicitly type error
        console.error('Error fetching data:', error);
      }
    );
  }
   // This method is triggered when user types in the search input field
   searchData() {
    this.pageNumber = 1;  // Reset to first page when performing a new search
    this.loadData();
  }
  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.pageNumber = newPage;
      this.loadData(); // Load data for the new page
    }
  }
  goToActivateData(id:any){
    this._storeService.removeDeleteData(id).subscribe(
      (response) => {
        this.loadData();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
