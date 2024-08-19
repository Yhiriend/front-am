import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmInputReactiveComponent } from './am-input-reactive.component';

describe('AmInputReactiveComponent', () => {
  let component: AmInputReactiveComponent;
  let fixture: ComponentFixture<AmInputReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmInputReactiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AmInputReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
