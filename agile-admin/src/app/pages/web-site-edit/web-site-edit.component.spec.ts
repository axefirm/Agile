import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebSiteEditComponent } from './web-site-edit.component';

describe('WebSiteEditComponent', () => {
  let component: WebSiteEditComponent;
  let fixture: ComponentFixture<WebSiteEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebSiteEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebSiteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
