import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css'
})
export class CategoryCreateComponent {
  category = { arName: '', enName: '' };
  selectedImage: File | null = null;
  formSubmitted = false;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private _categoryService: CategoryService, private _router: Router) {}

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

  onSubmit(event: Event) {
    event.preventDefault();
    this.formSubmitted = true;  // Mark form as submitted for validation check

    if (!this.category.arName || !this.category.enName || !this.selectedImage) {
      console.log("Please fill in all required fields.");
      return;
    }
    if (!this.selectedImage) {
      console.log("Image file is missing");
      return;
    }

    const formData = new FormData();
    formData.append('arName', this.category.arName);
    formData.append('enName', this.category.enName);
    formData.append('image', this.selectedImage, this.selectedImage.name);

        this._categoryService.postData(formData).subscribe(
      response => {
        this._router.navigate(['/dashboard/category']);
      },
      error => {
        console.error('Server error:', error);
      }
    );
  }
  cancel() {
    this._router.navigate(['/dashboard/category']); // Navigate to index on cancel
  }
}
