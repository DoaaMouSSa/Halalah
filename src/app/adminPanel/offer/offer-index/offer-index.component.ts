import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../../services/offer/offer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer-index',
  templateUrl: './offer-index.component.html',
  styleUrl: './offer-index.component.css'
})
export class OfferIndexComponent implements OnInit {
  offers: any[] = [];
  pageNumber: number = 1;
  pageSize: number = 5;
  totalPages: number = 0; // Total pages based on API response

  constructor(private _offerService: OfferService,private _router:Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this._offerService.getData(this.pageNumber, this.pageSize).subscribe(
      (response) => {
        this.offers = response.payload; // Get the list of stores
        // Calculate total pages if the API provides totalCount (you might need to adjust this)
        this.offers = response.payload; // Assuming this contains all stores
        this.totalPages = Math.ceil(response.dataCount/5) || 1000;  // Set total pages based on response
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
  goToUpdatedPage(id:any){
    this._router.navigate(['/dashboard/offer/edit/'+id]);

  }
   goToDeleteData(id:any){
    this._offerService.deleteData(id).subscribe(
      (response) => {
        this.loadData();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}

