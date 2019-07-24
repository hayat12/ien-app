import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessMatchingPage } from './business-m.page';

describe('BusinessMatchingPage', () => {
  let component: BusinessMatchingPage;
  let fixture: ComponentFixture<BusinessMatchingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessMatchingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessMatchingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
