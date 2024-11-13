import { Component } from '@angular/core';
import { NotificationService } from '../../../services/notificaion/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-create',
  templateUrl: './notification-create.component.html',
  styleUrl: './notification-create.component.css'
})
export class NotificationCreateComponent{
  notification = {
    arTitle: '',
    arBody: '',
    enTitle: '',
    enBody: '',
  };
  constructor(private _notificationService:NotificationService,
        private _router: Router
  ) {}
  onSubmit() {
    this._notificationService.postData(this.notification).subscribe(
        response => {
          this._router.navigate(['/dashboard/notification']);
        },
      error => {
        console.error('Error sending notification:', error);
      }
    );
  }

      }