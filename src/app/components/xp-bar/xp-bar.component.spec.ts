import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XpBarComponent } from './xp-bar.component';

describe('XpBarComponent', () => {
  let component: XpBarComponent;
  let fixture: ComponentFixture<XpBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XpBarComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XpBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
