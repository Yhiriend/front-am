import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducer/user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUserUpdate = createSelector(
  selectUserState,
  (state: UserState) => state.updated
);

export const selectGeneralUserProgress = createSelector(
  selectUserState,
  (state: UserState) => state.progress
);

export const selectHasAccess = createSelector(
  selectUserState,
  (state: UserState) => state.hasAccess
);

export const selectUserProgressUpdate = createSelector(
  selectUserState,
  (state: UserState) => state.hasProgressBeenUpdated
);

export const selectUserActivities = createSelector(
  selectUserState,
  (state: UserState) => state.activities
);
