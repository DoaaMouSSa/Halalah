import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store/store.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category/category.service';
interface Category {
  id: number;  // Adjust the type as needed
  enName: string; // Adjust the type as needed
}
@Component({
  selector: 'app-store-create',
  templateUrl: './store-create.component.html',
  styleUrl: './store-create.component.css'
})
export class StoreCreateComponent implements OnInit{
  constructor(private _storeService: StoreService,private _categoryService:CategoryService, private _router: Router) {}

  store = {
    arName: '',
    enName: '',
    arSmallDesc: '',
    enSmallDesc: '',
    link: '',
    categoryIds: [] as number[]
  };
  categories: Category[] = [];
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  ngOnInit() {
    // Fetch categories from your service and assign them to this.categories
    this.loadCategories();
  }
  loadCategories() {
    // Implement the logic to load categories from your service
    // Example:
    this._categoryService.getData().subscribe(data => {
      this.categories = data.payload;
      console.log(this.categories)
    });
  }
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
      console.log("Image file is missing");
      return;
    }

    const formData = new FormData();
    formData.append('arName', this.store.arName);
    formData.append('enName', this.store.enName);
    formData.append('arSmallDesc', this.store.arSmallDesc);
    formData.append('enSmallDesc', this.store.enSmallDesc);
    formData.append('link', this.store.link);
    this.store.categoryIds.forEach((categoryId: number) => {
      formData.append('categoryIds', categoryId.toString());
    });
    formData.append('image', this.selectedImage, this.selectedImage.name);

        this._storeService.postData(formData).subscribe(
      response => {
        this._router.navigate(['/dashboard/store']);
      },
      error => {
        console.error('Server error:', error);
      }
    );
  }

      }

