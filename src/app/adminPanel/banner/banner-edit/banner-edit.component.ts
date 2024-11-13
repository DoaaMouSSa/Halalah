import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category/category.service';
import { BannerService } from '../../../services/banner/banner.service';
@Component({
  selector: 'app-banner-edit',
  templateUrl: './banner-edit.component.html',
  styleUrl: './banner-edit.component.css'
})
export class BannerEditComponent {
  bannerId!: number;
  bannerForm!: FormGroup;
  selectedFile!: File | null;
  imagePreview: string | null = null;
  formSubmitted = false; // Track form submission for validation feedback

  constructor(
    private fb: FormBuilder,
    private _bannerService: BannerService,
    private _router: ActivatedRoute,
    private router: Router
  ) {
    this.bannerForm = this.fb.group({
      link: ['', Validators.required] // Add Validators if necessary
    });
    
  }

  ngOnInit(): void {
    const id = this._router.snapshot.paramMap.get('id'); // Get the id from the route
    if (id) {
      this.bannerId = +id; // Safely convert the id to a number
      this.fillForm();
    } else {
      console.error('No ID found in the route.');
    }
  }

  fillForm() {
    this._bannerService.GetById(this.bannerId.toString()).subscribe(
      banner => {
        if (banner) {
          this.bannerForm.patchValue({
            link: banner.payload.link ? banner.payload.link : null, // Check if link is empty
          });
          this.imagePreview = banner.payload.image; // Set the initial image preview
        } else {
          console.error('No data returned for the given ID');
        }
      },
      error => {
        console.error('Error in GetById service:', error); // Log any service error
      }
    );
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Display a preview of the selected new image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit() {
    this.formSubmitted = true; // Set to trigger validation feedback
    if (this.bannerForm.valid) {
      const formData = new FormData();
      formData.append('id', this.bannerId.toString());
      formData.append('link', this.bannerForm.get('link')?.value);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this._bannerService.updateData(this.bannerId.toString(), formData).subscribe(
        response => {
          console.log('Banner updated successfully:', response);
          this.router.navigate(['/dashboard/banner']);
        },
        error => {
          console.error('Error updating Banner:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  cancel() {
    this.router.navigate(['/dashboard/banner']); // Navigate to index on cancel
  }
}