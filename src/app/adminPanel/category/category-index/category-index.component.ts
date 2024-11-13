import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-category-index',
  templateUrl: './category-index.component.html',
  styleUrl: './category-index.component.css'
})
export class CategoryIndexComponent {
  data: any;

  constructor(private _categoryService: CategoryService,private _router:Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this._categoryService.getData().subscribe(
      (response: any) => { // Explicitly type response
        this.data = response.payload; // Assign the data to the property
      },
      (error: HttpErrorResponse) => { // Explicitly type error
        console.error('Error fetching data:', error);
      }
    );
  }
  goToUpdatedPage(id:number){
    this._router.navigate(['/dashboard/category/edit/'+id]);
    }
  goToDeleteData(id:any){
    this._categoryService.deleteData(id).subscribe(
      (response) => {
        this.loadData();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}

