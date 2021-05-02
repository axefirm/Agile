import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProduct1Component } from './new-product1.component';

describe('NewProduct1Component', () => {
  let component: NewProduct1Component;
  let fixture: ComponentFixture<NewProduct1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProduct1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProduct1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
