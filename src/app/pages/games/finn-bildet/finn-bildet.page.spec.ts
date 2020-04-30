import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinnBildetPage } from './finn-bildet.page';

describe('FinnBildetPage', () => {
  let component: FinnBildetPage;
  let fixture: ComponentFixture<FinnBildetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinnBildetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinnBildetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
