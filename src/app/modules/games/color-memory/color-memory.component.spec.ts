import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorMemoryComponent } from './color-memory.component';

describe('ColorMemoryComponent', () => {
  let component: ColorMemoryComponent;
  let fixture: ComponentFixture<ColorMemoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorMemoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
