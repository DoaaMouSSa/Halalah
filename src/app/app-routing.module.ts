import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryCreateComponent } from './adminPanel/category/category-create/category-create.component';
import { MainComponent } from './adminPanel/main/main.component';
import { DashboardComponent } from './adminPanel/dashboard/dashboard.component';
import { CategoryIndexComponent } from './adminPanel/category/category-index/category-index.component';
import { CategoryEditComponent } from './adminPanel/category/category-edit/category-edit.component';
import { StoreIndexComponent } from './adminPanel/store/store-index/store-index.component';
import { StoreCreateComponent } from './adminPanel/store/store-create/store-create.component';
import { StoreEditComponent } from './adminPanel/store/store-edit/store-edit.component';
import { BannerIndexComponent } from './adminPanel/banner/banner-index/banner-index.component';
import { BannerCreateComponent } from './adminPanel/banner/banner-create/banner-create.component';
import { BannerEditComponent } from './adminPanel/banner/banner-edit/banner-edit.component';
import { CouponIndexComponent } from './adminPanel/coupon/coupon-index/coupon-index.component';
import { CouponCreateComponent } from './adminPanel/coupon/coupon-create/coupon-create.component';
import { CouponEditComponent } from './adminPanel/coupon/coupon-edit/coupon-edit.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './guard/auth.guard';
import { NotificationIndexComponent } from './adminPanel/notification/notification-index/notification-index.component';
import { NotificationCreateComponent } from './adminPanel/notification/notification-create/notification-create.component';
import { CouponRemovedComponent } from './adminPanel/coupon/coupon-removed/coupon-removed.component';
import { OfferIndexComponent } from './adminPanel/offer/offer-index/offer-index.component';
import { OfferCreateComponent } from './adminPanel/offer/offer-create/offer-create.component';
import { OfferEditComponent } from './adminPanel/offer/offer-edit/offer-edit.component';
import { StoreRemovedComponent } from './adminPanel/store/store-removed/store-removed.component';
import { SearchIndexComponent } from './adminPanel/search/search-index/search-index.component';

const routes: Routes = [
 { path: '', component:MainComponent,children:[
    { path: '', redirectTo: '/login',pathMatch:'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
     { path: 'dashboard/category', component: CategoryIndexComponent, canActivate: [authGuard] },
     { path: 'dashboard/category/create', component: CategoryCreateComponent, canActivate: [authGuard] },
     { path: 'dashboard/category/edit/:id', component: CategoryEditComponent, canActivate: [authGuard] },
     //store
     { path: 'dashboard/store', component: StoreIndexComponent, canActivate: [authGuard] },
     { path: 'dashboard/store/create', component: StoreCreateComponent, canActivate: [authGuard] },
     { path: 'dashboard/store/edit/:id', component: StoreEditComponent , canActivate: [authGuard]},
     { path: 'dashboard/store/removed', component: StoreRemovedComponent, canActivate: [authGuard] },
     //search
     { path: 'dashboard/search', component: SearchIndexComponent, canActivate: [authGuard] },

//coupon
     { path: 'dashboard/coupon', component: CouponIndexComponent, canActivate: [authGuard] },
     { path: 'dashboard/coupon/removed', component: CouponRemovedComponent, canActivate: [authGuard] },
     { path: 'dashboard/coupon/create', component: CouponCreateComponent, canActivate: [authGuard] },
     { path: 'dashboard/coupon/edit/:id', component: CouponEditComponent, canActivate: [authGuard] },
    { path: 'dashboard/offer', component: OfferIndexComponent },
    { path: 'dashboard/offer/create', component: OfferCreateComponent },
    { path: 'dashboard/offer/edit/:id', component: OfferEditComponent },
     { path: 'dashboard/banner', component :BannerIndexComponent, canActivate: [authGuard]},
     { path: 'dashboard/banner/create', component: BannerCreateComponent, canActivate: [authGuard] },
     { path: 'dashboard/banner/edit/:id', component: BannerEditComponent, canActivate: [authGuard] },
     { path: 'dashboard/notification', component :NotificationIndexComponent, canActivate: [authGuard]},
     { path: 'dashboard/notification/create', component: NotificationCreateComponent, canActivate: [authGuard] },
] },
{ path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
