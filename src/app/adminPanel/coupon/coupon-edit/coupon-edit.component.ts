import { Component, OnInit } from '@angular/core';
import { CouponService } from '../../../services/coupon/coupon.service';
import { CategoryService } from '../../../services/category/category.service';
import { StoreService } from '../../../services/store/store.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-coupon-edit',
  templateUrl: './coupon-edit.component.html',
  styleUrl: './coupon-edit.component.css'
})
export class CouponEditComponent implements OnInit {
  stores: any[] = []; // Array to hold store data
  categories: any[] = []; // Array to hold category data
  couponId: any; // ID of the coupon to update
  coupon = {
    code: '',
    discount: 0,
    arSmallDesc: '',
    enSmallDesc: '',
    isActive: false,
    link: '',
    storeId: 0,
    categoryId: 0
  };

  constructor(
    private _storeService: StoreService,
    private _categoryService: CategoryService,
    private _couponService: CouponService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.couponId = this._route.snapshot.paramMap.get('id'); // Get the coupon ID from the route
    this.loadStores();
    this.loadCouponData();
  }

  loadStores() {
    this._storeService.getData(1, 1000).subscribe(data => {
      this.stores = data.payload;
      this.loadCategories(this.coupon.storeId); // Call method with the selected store ID
    });
  }

  loadCategories(storeId: number) {
    this._categoryService.getDataByStore(storeId).subscribe(data => {
      this.categories = data.payload;
      if (this.categories.length > 0) {
        // Set the first category as the default
        this.coupon.categoryId = this.categories[0].id;
      }
    });
  }

  loadCouponData() {
    this._couponService.GetById(this.couponId).subscribe(
      data => {
        this.coupon = data.payload;
        console.log(data)

      },
      error => {
        console.error('Error loading coupon data:', error);
      }
    );
  }
  onStoreChange(event: any) {
    const storeId = event.target.value;
    this.loadCategories(storeId);
  }
  onSubmit() {
    this._couponService.updateData(this.couponId, this.coupon).subscribe(
      response => {
        this._router.navigate(['/dashboard/coupon']);
      },
      error => {
        console.error('Error updating coupon:', error);
      }
    );
  }

  cancel() {
    this._router.navigate(['/dashboard/coupon']);
  }
}