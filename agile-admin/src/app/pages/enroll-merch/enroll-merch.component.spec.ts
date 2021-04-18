import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollMerchComponent } from './enroll-merch.component';

describe('EnrollMerchComponent', () => {
  let component: EnrollMerchComponent;
  let fixture: ComponentFixture<EnrollMerchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollMerchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollMerchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
