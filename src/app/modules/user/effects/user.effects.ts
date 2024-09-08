import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../../services/user/user.service';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import {
  getActivityById,
  getActivityByIdResponse,
  getGeneralUserProgress,
  updateUser,
  updateUserProgress,
  updateUserProgressResponse,
  updateUserResponse,
  userActivities,
  userActivitiesResponse,
  userProgressResponse,
} from '../actions/user.actions';
import { startLoading, stopLoading } from '../../auth/auth-state/auth.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store
  ) {}

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      tap(() => this.store.dispatch(startLoading())),
      exhaustMap((action) =>
        this.userService
          .update(action.user, action.newPassword, action.token)
          .pipe(
            map((result) => updateUserResponse({ result })),
            catchError((error: any) =>
              of(updateUserResponse({ result: error }))
            )
          )
      ),
      tap(() => this.store.dispatch(stopLoading()))
    )
  );

  userProgress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getGeneralUserProgress),
      tap(() => this.store.dispatch(startLoading())),
      exhaustMap((action) =>
        this.userService.getProgress(action.id, action.token).pipe(
          map((result) => userProgressResponse({ result })),
          catchError((error: any) =>
            of(userProgressResponse({ result: error }))
          )
        )
      ),
      tap(() => this.store.dispatch(stopLoading()))
    )
  );

  userActivities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActivities),
      tap(() => this.store.dispatch(startLoading())),
      exhaustMap((action) =>
        this.userService.getActivities(action.id, action.token).pipe(
          map((result) => userActivitiesResponse({ result })),
          catchError((error: any) =>
            of(userActivitiesResponse({ result: error }))
          )
        )
      ),
      tap(() => this.store.dispatch(stopLoading()))
    )
  );

  userProgressUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserProgress),
      tap(() => this.store.dispatch(startLoading())),
      exhaustMap((action) =>
        this.userService.updateProgress(action.progress, action.token).pipe(
          map((result) => updateUserProgressResponse({ result })),
          catchError((error: any) =>
            of(updateUserProgressResponse({ result: error }))
          )
        )
      ),
      tap(() => this.store.dispatch(stopLoading()))
    )
  );

  userGetActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getActivityById),
      tap(() => this.store.dispatch(startLoading())),
      exhaustMap((action) =>
        this.userService.getActivityById(action.id, action.token).pipe(
          map((result) => getActivityByIdResponse({ result })),
          catchError((error: any) =>
            of(getActivityByIdResponse({ result: error }))
          )
        )
      ),
      tap(() => this.store.dispatch(stopLoading()))
    )
  );
}
