import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-am-input-reactive',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './am-input-reactive.component.html',
  styleUrl: './am-input-reactive.component.css'
})
export class AmInputReactiveComponent {
  @Input() inputId: string = '';
  @Input() inputName: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() inputType: string = 'text';
  @Input() formControl: FormControl = new FormControl();
}
