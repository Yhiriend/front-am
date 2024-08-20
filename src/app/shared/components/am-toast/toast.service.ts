// toast.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface Toast {
  type: 'success' | 'error' | 'default';
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new Subject<Toast>();

  show(type: 'success' | 'error' | 'default', title: string, message: string) {
    this.toastSubject.next({ type, title, message });
  }

  getToast() {
    return this.toastSubject.asObservable();
  }
}
