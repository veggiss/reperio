import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameInfoPage } from './game-info.page';

describe('GameInfoPage', () => {
  let component: GameInfoPage;
  let fixture: ComponentFixture<GameInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
