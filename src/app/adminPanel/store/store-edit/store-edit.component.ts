import { Component } from '@angular/core';
import { StoreService } from '../../../services/store/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../../../services/category/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface Category {
  id: number;  // Adjust the type as needed
  enName: string; // Adjust the type as needed
}
@Component({
  selector: 'app-store-edit',
  templateUrl: './store-edit.component.html',
  styleUrl: './store-edit.component.css'
})
export class StoreEditComponent {
 
  storeId!: number;
  storeForm!: FormGroup;
  selectedFile!: File | null;
  imagePreview: string | null = null;
  formSubmitted = false; // Track form submission for validation feedback
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private _categoryService: CategoryService,
    private _storeService: StoreService,
    private _router: ActivatedRoute,
    private router: Router
  ) {
    this.storeForm = this.fb.group({
      arName: ['', [Validators.required]],
      enName: ['',[Validators.required]],
      arSmallDesc: [''],
      enSmallDesc: [''],
      link:[''],
      order:[''],
      categoryIds: [[]] // Corrected name
    });
    
  }

  ngOnInit(): void {
    const id = this._router.snapshot.paramMap.get('id'); // Get the id from the route
    if (id) {
      this.storeId = +id; // Safely convert the id to a number
      this.fillForm();
      this.loadCategories();
    } else {
      console.error('No ID found in the route.');
    }
    
  }

  fillForm() {
    this._storeService.GetById(this.storeId.toString()).subscribe(
      store => {
        if (store) {
          this.storeForm.patchValue({
            arName: store.payload.arName,
            enName: store.payload.enName,
            arSmallDesc:store.payload.arSmallDesc,
            enSmallDesc:store.payload.enSmallDesc,
            order:store.payload.order,
            link:store.payload.link,
            categoryIds: store.payload.categoryIds, // Correct assignment
          });
          this.imagePreview ="http://worldcoupons-001-site1.ltempurl.com/Images/store/"+store.payload.image; // Set the initial image preview
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
  loadCategories() {
    // Implement the logic to load categories from your service
    // Example:
    this._categoryService.getData().subscribe(data => {
      this.categories = data.payload;
      console.log(this.categories)
    });
  }
  onSubmit() {
    this.formSubmitted = true; // Set to trigger validation feedback
    if (this.storeForm.valid) {
      const formData = new FormData();
      formData.append('id', this.storeId.toString());
      formData.append('arName', this.storeForm.get('arName')?.value);
      formData.append('enName', this.storeForm.get('enName')?.value);
      formData.append('arSmallDesc', this.storeForm.get('arSmallDesc')?.value);
      formData.append('enSmallDesc', this.storeForm.get('enSmallDesc')?.value);
      formData.append('link', this.storeForm.get('link')?.value);
      formData.append('order', this.storeForm.get('order')?.value);
 // Append categoryIds as a comma-separated string or as individual fields
 const selectedCategoryIds = this.storeForm.get('categoryIds')?.value || [];
 selectedCategoryIds.forEach((id: number) => formData.append('categoryIds', id.toString()));      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this._storeService.updateData(this.storeForm.toString(), formData).subscribe(
        response => {
          console.log('store updated successfully:', response);
          this.router.navigate(['/dashboard/store']);
        },
        error => {
          console.error('Error updating store:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  cancel() {
    this.router.navigate(['/dashboard/store']); // Navigate to index on cancel
  }
}