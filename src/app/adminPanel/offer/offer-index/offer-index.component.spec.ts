import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferIndexComponent } from './offer-index.component';

describe('OfferIndexComponent', () => {
  let component: OfferIndexComponent;
  let fixture: ComponentFixture<OfferIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfferIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
