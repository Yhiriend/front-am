import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login, loginResponse } from '../actions/login.actions';
import {
  selectAuthState,
  selectAuthToken,
} from '../../auth-state/auth.selectors';
import { encryptData } from '../../../../utils/datahelper';
import { environment } from '../../../../../environments/environment';
import { Observable, Subject, last, map, take, takeUntil } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { updateUserResponse } from '../../../user/actions/user.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
})
export default class LoginComponent implements OnDestroy {
  private ngUnsubscribe = new Subject();

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  invalidMessage$: Observable<any> = new Observable<any>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly store: Store,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  onSubmitLogin(event: Event) {
    event.preventDefault();
    if (this.loginForm.valid) {
      const email = this.loginForm.controls['email'].value!;
      const password = this.loginForm.controls['password'].value!;

      this.store.dispatch(login({ email, password }));
      this.store
        .select(selectAuthState)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(({ isAuthenticated, token, userLoggedIn }) => {
          console.log('login', isAuthenticated);
          if (isAuthenticated) {
            console.log('athenticated', isAuthenticated);
            const data = { token, isAuthenticated, userLoggedIn };
            const secureData = encryptData(data, environment.secretKey);
            localStorage.setItem('token', JSON.stringify(secureData));
            this.router.navigate(['/dashboard']);
          }
        });
    }
    this.invalidMessage$ = this.store.select(selectAuthToken).pipe(
      map((token) =>
        token === 'Invalid Password' ? token : 'Invalid Credentials'
      ),
      takeUntil(this.ngUnsubscribe)
    );
  }

  goToRegisterPage() {
    this.router.navigate(['/register']);
  }
}
