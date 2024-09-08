import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { selectAuthState } from '../../../modules/auth/auth-state/auth.selectors';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-am-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './am-button.component.html',
  styleUrl: './am-button.component.css',
})
export class AmButtonComponent {
  @Input('buttonColor') buttonColor: 'primary' | 'secondary' = 'primary';
  @Input('buttonType') buttonType?: string;
  @Output() onClick = new EventEmitter<void>();
  isButtonPressed: boolean = false;
  isLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.isLoading$ = this.store
      .pipe(select(selectAuthState))
      .pipe(map((state) => state.isLoading));
  }

  getButtonClass(): string {
    return this.buttonColor === 'primary'
      ? 'w-full middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40' +
          (this.isButtonPressed ? ' focus:ring focus:ring-pink-200' : '')
      : 'w-full middle none center rounded-lg border border-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:opacity-75' +
          (this.isButtonPressed ? ' focus:ring focus:ring-pink-200' : '');
  }

  onMouseDown() {
    this.isButtonPressed = true;
  }

  onMouseUp() {
    this.isButtonPressed = false;
  }

  emitOnclick() {
    this.onClick.emit();
  }
}
