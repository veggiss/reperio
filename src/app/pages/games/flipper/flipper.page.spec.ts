import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipperPage } from './flipper.page';

describe('FlipperPage', () => {
  let component: FlipperPage;
  let fixture: ComponentFixture<FlipperPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlipperPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipperPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
