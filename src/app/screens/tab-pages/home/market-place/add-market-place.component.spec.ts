import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMarketPlaceComponent } from './add-market-place.component';

describe('AddMarketPlaceComponent', () => {
  let component: AddMarketPlaceComponent;
  let fixture: ComponentFixture<AddMarketPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMarketPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMarketPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
