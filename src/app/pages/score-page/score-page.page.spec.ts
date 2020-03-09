import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorePagePage } from './score-page.page';

describe('ScorePagePage', () => {
  let component: ScorePagePage;
  let fixture: ComponentFixture<ScorePagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScorePagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
