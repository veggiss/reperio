import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SantUsantPage } from './sant-usant.page';

describe('SantUsantPage', () => {
  let component: SantUsantPage;
  let fixture: ComponentFixture<SantUsantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SantUsantPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SantUsantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
