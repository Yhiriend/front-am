import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import LoginComponent from './modules/auth/login/login-component/login.component';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsLoading } from './modules/auth/auth-state/auth.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterOutlet,
    SharedModule,
    LoginComponent,
    FormsModule,
  ],
})
export class AppComponent implements OnInit {
  title = 'app-web-am';

  isLoading$ = new Observable<boolean>();

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(selectIsLoading);
  }
}
