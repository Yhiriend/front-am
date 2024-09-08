import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaberintoZenComponent } from './laberinto-zen.component';

describe('LaberintoZenComponent', () => {
  let component: LaberintoZenComponent;
  let fixture: ComponentFixture<LaberintoZenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaberintoZenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaberintoZenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
