import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmModalComponent } from './am-modal.component';

describe('AmModalComponent', () => {
  let component: AmModalComponent;
  let fixture: ComponentFixture<AmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
