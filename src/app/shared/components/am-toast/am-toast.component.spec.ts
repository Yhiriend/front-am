import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmToastComponent } from './am-toast.component';

describe('AmToastComponent', () => {
  let component: AmToastComponent;
  let fixture: ComponentFixture<AmToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmToastComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AmToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
