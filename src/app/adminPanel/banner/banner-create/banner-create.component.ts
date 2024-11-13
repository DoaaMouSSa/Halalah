import { Component } from '@angular/core';
import { BannerService } from '../../../services/banner/banner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner-create',
  templateUrl: './banner-create.component.html',
  styleUrl: './banner-create.component.css'
})
export class BannerCreateComponent {
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  banner = { link: ''};
  constructor(private _bannerService: BannerService, private _router: Router) {}

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.selectedImage = event.target.files[0] as File;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  onSubmit() {
    
    if (!this.selectedImage) {
      alert("Image file is missing");
      return;
    }

    const formData = new FormData();
    formData.append('link', this.banner.link);
    formData.append('image', this.selectedImage, this.selectedImage.name);

        this._bannerService.postData(formData).subscribe(
      response => {
        this._router.navigate(['/dashboard/banner']);
      },
      error => {
        console.error('Server error:', error);
      }
    );
  }
  cancel() {
    this._router.navigate(['/dashboard/banner']); // Navigate to index on cancel
  }
      }
