import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinnOrdetPage } from './finn-ordet.page';

describe('FinnOrdetPage', () => {
  let component: FinnOrdetPage;
  let fixture: ComponentFixture<FinnOrdetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinnOrdetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinnOrdetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
