import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinnOrdetHistoryPage } from './finn-ordet-history.page';

describe('FinnOrdetHistoryPage', () => {
  let component: FinnOrdetHistoryPage;
  let fixture: ComponentFixture<FinnOrdetHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinnOrdetHistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinnOrdetHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
