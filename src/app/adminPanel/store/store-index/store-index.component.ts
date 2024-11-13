import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store/store.service';
@Component({
  selector: 'app-store-index',
  templateUrl: './store-index.component.html',
  styleUrl: './store-index.component.css'
})
export class StoreIndexComponent implements OnInit {
  stores: any[] = [];
  pageNumber: number = 1;
  pageSize: number = 5;
  totalPages: number = 0; // Total pages based on API response

  constructor(private _storeService: StoreService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this._storeService.getData(this.pageNumber, this.pageSize).subscribe(
      (response) => {
        this.stores = response.payload; // Get the list of stores
        // Calculate total pages if the API provides totalCount (you might need to adjust this)
        this.stores = response.payload; // Assuming this contains all stores
        this.totalPages = 10   
         },
      (error) => {
        console.error('Error fetching data', error);
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

