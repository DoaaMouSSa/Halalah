import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BannerService } from '../../../services/banner/banner.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-banner-index',
  templateUrl: './banner-index.component.html',
  styleUrl: './banner-index.component.css'
})
export class BannerIndexComponent implements OnInit {
  data: any;

  constructor(private _bannerService: BannerService,private _router:Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this._bannerService.getData().subscribe(
      (response: any) => { // Explicitly type response
        this.data = response.payload; // Assign the data to the property
      },
      (error: HttpErrorResponse) => { // Explicitly type error
        console.error('Error fetching data:', error);
      }
    );
  }
  goToUpdatedPage(id:number){
    this._router.navigate(['/dashboard/banner/edit/'+id]);
    }
  goToDeleteData(id:any){
    this._bannerService.deleteData(id).subscribe(
      (response) => {
        this.loadData();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}

