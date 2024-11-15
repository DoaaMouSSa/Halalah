import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { StatesService } from '../../services/states/states.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  data: any;

  constructor(private _satesService: StatesService) {}

  ngOnInit(): void {
    this.loadData();
  }

   loadData(): void {
    this._satesService.getData().subscribe(
      (response: any) => {
        // Check and assign the payload if it exists
        if (response.result && response.result.payload) {
          this.data = response.result.payload;
          console.log(this.data)
        } else {
          console.warn("Payload data is not available in response");
        }
      },
      (error: HttpErrorResponse) => { // Explicitly type error
        console.error('Error fetching data:', error);
      }
    );
  }
}
