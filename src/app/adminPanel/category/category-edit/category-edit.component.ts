import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category/category.service';
@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css'
})
export class CategoryEditComponent {

  categoryId!: number;
  categoryForm!: FormGroup;
  selectedFile!: File | null;
  imagePreview: string | null = null;
  formSubmitted = false; // Track form submission for validation feedback

  constructor(
    private fb: FormBuilder,
    private _categoryService: CategoryService,
    private _router: ActivatedRoute,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      arName: ['', [Validators.required]],
      enName: ['',[Validators.required]],
    });
    
  }

  ngOnInit(): void {
    const id = this._router.snapshot.paramMap.get('id'); // Get the id from the route
    if (id) {
      this.categoryId = +id; // Safely convert the id to a number
      this.fillForm();
    } else {
      console.error('No ID found in the route.');
    }
  }

  fillForm() {
    this._categoryService.GetById(this.categoryId.toString()).subscribe(
      category => {
        if (category) {
          this.categoryForm.patchValue({
            arName: category.payload.arName,
            enName: category.payload.enName,
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
    if (this.categoryForm.valid) {
      const formData = new FormData();
      formData.append('id', this.categoryId.toString());
      formData.append('arName', this.categoryForm.get('arName')?.value);
      formData.append('enName', this.categoryForm.get('enName')?.value);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this._categoryService.updateData(this.categoryId.toString(), formData).subscribe(
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