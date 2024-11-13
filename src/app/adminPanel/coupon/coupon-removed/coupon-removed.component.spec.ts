import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponRemovedComponent } from './coupon-removed.component';

describe('CouponRemovedComponent', () => {
  let component: CouponRemovedComponent;
  let fixture: ComponentFixture<CouponRemovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CouponRemovedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponRemovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
