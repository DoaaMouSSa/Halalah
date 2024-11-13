import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrl: './offer-edit.component.css'
})
export class OfferEditComponent {
  
  offerId!: number;
  offerForm!: FormGroup;
  selectedFile!: File | null;
  imagePreview: string | null = null;
  formSubmitted = false; // Track form submission for validation feedback

  constructor(
    private fb: FormBuilder,
    private _categoryService: CategoryService,
    private _router: ActivatedRoute,
    private router: Router
  ) {
    this.offerForm = this.fb.group({
      link: ['',[Validators.required]],
    });
    
  }

  ngOnInit(): void {
    const id = this._router.snapshot.paramMap.get('id'); // Get the id from the route
    if (id) {
      this.offerId = +id; // Safely convert the id to a number
      this.fillForm();
    } else {
      console.error('No ID found in the route.');
    }
  }

  fillForm() {
    this._categoryService.GetById(this.offerId.toString()).subscribe(
      category => {
        if (category) {
          this.offerForm.patchValue({
            discount: category.payload.discount,
            code: category.payload.enName,
            link: category.payload.link,
            expiry_date: category.payload.expiry_date,
            isActive: category.payload.isActive,
            storeId: category.payload.storeId,
          });
          this.imagePreview = category.payload.image; // Set the initial image preview
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
    if (this.offerForm.valid) {
      const formData = new FormData();
      formData.append('id', this.offerId.toString());
      formData.append('link', this.offerForm.get('link')?.value);
      formData.append('discount', this.offerForm.get('discount')?.value);
      formData.append('code', this.offerForm.get('code')?.value);
      formData.append('storeId', this.offerForm.get('storeId')?.value);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this._categoryService.updateData(this.offerId.toString(), formData).subscribe(
        response => {
          console.log('Category updated successfully:', response);
          this.router.navigate(['/dashboard/category']);
        },
        error => {
          console.error('Error updating Category:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  cancel() {
    this.router.navigate(['/dashboard/category']); // Navigate to index on cancel
  }
}