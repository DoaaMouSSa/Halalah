import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../services/search/search.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-index',
  templateUrl: './search-index.component.html',
  styleUrl: './search-index.component.css'
})
export class SearchIndexComponent implements OnInit {
  data: any[] = [];
  pageNumber: number = 1;
  pageSize: number = 5;
  totalPages: number = 1000; // Total pages based on API response
    
  constructor(private _searchService: SearchService,private _router:Router) {}
  
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
  this._searchService.getData(this.pageNumber, this.pageSize).subscribe(
    (response: any) => {  // Handle the response
      this.data = response.payload;  // Assign the stores data
      this.totalPages = Math.ceil(response.dataCount/5) || 1000;  // Set total pages based on response
      console.log(this.data)
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
   goToDeleteData(id:any){
    this._searchService.deleteData(id).subscribe(
      (response) => {
        this.loadData();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}

