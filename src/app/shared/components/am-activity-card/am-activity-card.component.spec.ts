import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmActivityCardComponent } from './am-activity-card.component';

describe('AmActivityCardComponent', () => {
  let component: AmActivityCardComponent;
  let fixture: ComponentFixture<AmActivityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmActivityCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AmActivityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
