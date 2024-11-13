import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../services/notificaion/notification.service';
@Component({
  selector: 'app-notification-index',
  templateUrl: './notification-index.component.html',
  styleUrl: './notification-index.component.css'
})
export class NotificationIndexComponent implements OnInit{
  data: any;

  constructor(private _notificationService: NotificationService,private _router:Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this._notificationService.getData().subscribe(
      (response: any) => { // Explicitly type response
        this.data = response.result.payload; // Assign the data to the property
        console.log(response.result.payload)
      },
      (error: HttpErrorResponse) => { // Explicitly type error
        console.error('Error fetching data:', error);
      }
    );
  }
}