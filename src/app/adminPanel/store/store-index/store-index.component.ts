import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store/store.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-store-index',
  templateUrl: './store-index.component.html',
  styleUrl: './store-index.component.css'
})
export class StoreIndexComponent implements OnInit {
  stores: any[] = [];
  pageNumber: number = 1;
  pageSize: number = 5;
  totalPages: number = 1000; // Total pages based on API response
  name: string = "";  // Bind the 'name' variable to the input field
  
  constructor(private _storeService: StoreService,private _router:Router) {}
  
  ngOnInit(): void {
    this.loadData();  // Load data on initialization
  }
  
  // This method is triggered when user types in the search input field
  searchData() {
    this.pageNumber = 1;  // Reset to first page when performing a new search
    this.loadData();
  }
// This method loads data from the service
loadData(): void {
  this._storeService.getData(this.pageNumber, this.pageSize, this.name).subscribe(
    (response: any) => {  // Handle the response
      this.stores = response.payload;  // Assign the stores data
      this.totalPages = response.totalPages || 1000;  // Set total pages based on response
    },
    (error: HttpErrorResponse) => {  // Handle error
      console.error('Error fetching data:', error);
    }
  );
}
  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.pageNumber = newPage;
      this.loadData(); // Load data for the new page
    }
  }
  goToUpdatedPage(id:number){
    this._router.navigate(['/dashboard/store/edit/'+id]);
    }
   goToDeleteData(id:any){
    this._storeService.deleteData(id).subscribe(
      (response) => {
        this.loadData();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}

