import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponIndexComponent } from './coupon-index.component';

describe('CouponIndexComponent', () => {
  let component: CouponIndexComponent;
  let fixture: ComponentFixture<CouponIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CouponIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
