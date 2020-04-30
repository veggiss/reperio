import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StatBarComponent } from './stat-bar.component';

describe('StatBarComponent', () => {
  let component: StatBarComponent;
  let fixture: ComponentFixture<StatBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatBarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StatBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
