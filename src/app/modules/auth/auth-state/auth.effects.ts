import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../../services/auth-service/auth-service.service';
import { Store } from '@ngrx/store';
import { login, loginResponse } from '../login/actions/login.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { startLoading, stopLoading } from './auth.actions';
import {
  register,
  registerResponse,
} from '../register/actions/register.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      tap(() => this.store.dispatch(startLoading())),
      exhaustMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map((result) => loginResponse({ result })),
          catchError((error: any) => of(loginResponse({ result: error })))
        )
      ),
      tap(() => this.store.dispatch(stopLoading()))
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      tap(() => this.store.dispatch(startLoading())),
      exhaustMap((action) =>
        this.authService.register(action.user).pipe(
          map((result) => registerResponse({ result })),
          catchError((error: any) => of(registerResponse({ result: error })))
        )
      ),
      tap(() => this.store.dispatch(stopLoading()))
    )
  );
}
