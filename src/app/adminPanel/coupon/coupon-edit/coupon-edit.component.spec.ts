import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponEditComponent } from './coupon-edit.component';

describe('CouponEditComponent', () => {
  let component: CouponEditComponent;
  let fixture: ComponentFixture<CouponEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CouponEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
