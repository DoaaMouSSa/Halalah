import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreRemovedComponent } from './store-removed.component';

describe('StoreRemovedComponent', () => {
  let component: StoreRemovedComponent;
  let fixture: ComponentFixture<StoreRemovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoreRemovedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreRemovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
