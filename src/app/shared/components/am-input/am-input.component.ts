import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-am-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './am-input.component.html',
  styleUrl: './am-input.component.css'
})
export class AmInputComponent {
  @Input ('placeholder') placeholder: string = 'Placeholder';
  @Input ('type') type: string = 'text';
  @Input ('inputId') inputId: string = 'text';
  @Input ('inputName') inputName: string = '';
  @Input ('inputRequired') inputRequired: boolean = false;
  @Input() control!: FormControl;
  @Input('options') options: any;

}
