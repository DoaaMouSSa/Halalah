import { Component, OnInit } from '@angular/core';
import { CouponService } from '../../../services/coupon/coupon.service';
import { CategoryService } from '../../../services/category/category.service';
import { StoreService } from '../../../services/store/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coupon-create',
  templateUrl: './coupon-create.component.html',
  styleUrl: './coupon-create.component.css'
})
export class CouponCreateComponent implements OnInit{
  stores: any[] = [];  // Array to hold store data
  categories: any[] = [];  // Array to hold store data
  coupon = {
    code: '',
    discount: 0,
    arSmallDesc:'',
    enSmallDesc:'',
    isActive: false,
    link: '',
    storeId: 0,
    categoryId: 0
  };
  constructor(private _storeService:StoreService,
    private _categoryService:CategoryService,
    private _couponService:CouponService,
    private _router: Router
  ) {}
  ngOnInit() {
    this.loadStores();
    this.loadCategories();
  }

  loadStores() {
    this._storeService.getData(1, 1000).subscribe(data => {
      this.stores = data.payload;
    });
  }
  loadCategories() {
    this._categoryService.getData().subscribe(data => {
      this.categories = data.payload;
    });
  }
  onSubmit() {
    this._couponService.postData(this.coupon).subscribe(
        response => {
          this._router.navigate(['/dashboard/coupon']);
        },
      error => {
        console.error('Error sending coupon:', error);
      }
    );
  }

      }

