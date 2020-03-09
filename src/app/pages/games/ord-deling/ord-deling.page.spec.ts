import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdDelingPage } from './ord-deling.page';

describe('OrdDelingPage', () => {
  let component: OrdDelingPage;
  let fixture: ComponentFixture<OrdDelingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdDelingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdDelingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
