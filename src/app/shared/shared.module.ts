import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmButtonComponent } from './components/am-button/am-button.component';
import { AmInputComponent } from './components/am-input/am-input.component';
import { AmActivityCardComponent } from './components/am-activity-card/am-activity-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmInputReactiveComponent } from './components/am-input-reactive/am-input-reactive.component';


@NgModule({
  declarations: [],
  exports: [AmButtonComponent, AmInputComponent, AmActivityCardComponent],
  imports: [CommonModule, AmButtonComponent, AmInputComponent, AmActivityCardComponent, FormsModule, ReactiveFormsModule, AmInputReactiveComponent],
})
export class SharedModule {}
