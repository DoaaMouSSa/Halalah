import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryCreateComponent } from './adminPanel/category/category-create/category-create.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './adminPanel/dashboard/dashboard.component';
import { MainComponent } from './adminPanel/main/main.component';
import { SideMenuComponent } from './adminPanel/shared/side-menu/side-menu.component';
import { NavbarComponent } from './adminPanel/shared/navbar/navbar.component';
import { FooterComponent } from './adminPanel/shared/footer/footer.component';
import { CategoryIndexComponent } from './adminPanel/category/category-index/category-index.component';
import { CategoryEditComponent } from './adminPanel/category/category-edit/category-edit.component';
import { StoreIndexComponent } from './adminPanel/store/store-index/store-index.component';
import { StoreCreateComponent } from './adminPanel/store/store-create/store-create.component';
import { StoreEditComponent } from './adminPanel/store/store-edit/store-edit.component';
import { BannerCreateComponent } from './adminPanel/banner/banner-create/banner-create.component';
import { BannerIndexComponent } from './adminPanel/banner/banner-index/banner-index.component';
import { BannerEditComponent } from './adminPanel/banner/banner-edit/banner-edit.component';
import { CouponEditComponent } from './adminPanel/coupon/coupon-edit/coupon-edit.component';
import { CouponIndexComponent } from './adminPanel/coupon/coupon-index/coupon-index.component';
import { CouponCreateComponent } from './adminPanel/coupon/coupon-create/coupon-create.component';
import { StoreService } from './services/store/store.service';
import { LoginComponent } from './auth/login/login.component';
import { NotificationIndexComponent } from './adminPanel/notification/notification-index/notification-index.component';
import { NotificationCreateComponent } from './adminPanel/notification/notification-create/notification-create.component';
import { CouponRemovedComponent } from './adminPanel/coupon/coupon-removed/coupon-removed.component';
import { OfferIndexComponent } from './adminPanel/offer/offer-index/offer-index.component';
import { OfferCreateComponent } from './adminPanel/offer/offer-create/offer-create.component';
import { OfferEditComponent } from './adminPanel/offer/offer-edit/offer-edit.component';
import { StoreRemovedComponent } from './adminPanel/store/store-removed/store-removed.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryCreateComponent,
    DashboardComponent,
    MainComponent,
    SideMenuComponent,
    NavbarComponent,
    FooterComponent,
    CategoryIndexComponent,
    CategoryEditComponent,
    StoreIndexComponent,
    StoreCreateComponent,
    StoreEditComponent,
    BannerCreateComponent,
    BannerIndexComponent,
    BannerEditComponent,
    CouponEditComponent,
    CouponIndexComponent,
    CouponCreateComponent,
    LoginComponent,
    NotificationIndexComponent,
    NotificationCreateComponent,
    CouponRemovedComponent,
    OfferIndexComponent,
    OfferCreateComponent,
    OfferEditComponent,
    StoreRemovedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(),
    StoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
