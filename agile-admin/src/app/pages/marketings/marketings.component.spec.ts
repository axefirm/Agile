import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingsComponent } from './marketings.component';

describe('MarketingsComponent', () => {
  let component: MarketingsComponent;
  let fixture: ComponentFixture<MarketingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
