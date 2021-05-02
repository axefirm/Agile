import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetail1Component } from './product-detail1.component';

describe('ProductDetail1Component', () => {
  let component: ProductDetail1Component;
  let fixture: ComponentFixture<ProductDetail1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetail1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetail1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
