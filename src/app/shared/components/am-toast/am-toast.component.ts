// am-toast.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-am-toast',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './am-toast.component.html',
  styleUrls: ['./am-toast.component.css'],
})
export class AmToastComponent {
  title = '';
  message = '';
  visible = false;
  icon = '';
  toastClass = '';
  iconClass = '';
  titleClass = '';

  constructor(private toastService: ToastService) {
    this.toastService.getToast().subscribe((toast) => {
      this.title = toast.title;
      this.message = toast.message;
      this.visible = true;
      this.setToastType(toast.type);

      setTimeout(() => this.closeToast(), 5000);
    });
  }

  setToastType(type: 'success' | 'error' | 'default') {
    switch (type) {
      case 'success':
        this.toastClass = 'bg-green-100 toast-show';
        this.iconClass = 'text-green-500';
        this.titleClass = 'text-green-600';
        this.icon = 'check_circle';
        break;
      case 'error':
        this.toastClass = 'bg-red-100 toast-show';
        this.iconClass = 'text-red-500';
        this.titleClass = 'text-red-600';
        this.icon = 'highlight_off';
        break;
      default:
        this.toastClass = 'bg-gray-100 toast-show';
        this.iconClass = 'text-gray-500';
        this.titleClass = 'text-gray-600';
        this.icon = 'info';
        break;
    }
  }

  closeToast() {
    this.toastClass = this.toastClass.replace('toast-show', 'toast-hide');
    setTimeout(() => (this.visible = false), 300); // Coincide con el tiempo de la animación de CSS
  }
}
