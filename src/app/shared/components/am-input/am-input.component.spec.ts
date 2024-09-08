import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmInputComponent } from './am-input.component';

describe('AmInputComponent', () => {
  let component: AmInputComponent;
  let fixture: ComponentFixture<AmInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AmInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
