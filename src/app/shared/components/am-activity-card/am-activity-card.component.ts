import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-am-activity-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './am-activity-card.component.html',
  styleUrl: './am-activity-card.component.css',
})
export class AmActivityCardComponent {
  @Input('completed') completed: string = '0';
  @Input('total') total: string = '0';
  @Input('progress') progress: string = '0%';
  @Input('activityname') activityname: string = 'Activity Name';
  @Output() onClick = new EventEmitter<void>();

  truncateText(text: string, wordCount: number): string {
    const words = text.split(' ');

    if (words.length > wordCount) {
      const truncatedText = words.slice(0, wordCount).join(' ') + '...';
      return truncatedText;
    }

    return text;
  }

  emitOnclick() {
    this.onClick.emit();
  }
}
