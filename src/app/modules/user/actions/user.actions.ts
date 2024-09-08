import { createAction, props } from '@ngrx/store';
import { User } from '../../../models/user.model';
import { UserProgress } from '../../../models/userprogress';

export const updateUser = createAction(
  '[User] Update User',
  props<{ user: User; newPassword: string | null; token: string }>()
);
export const updateUserResponse = createAction(
  '[User] Update User Response',
  props<{ result: any }>()
);
export const getGeneralUserProgress = createAction(
  '[User] Get User Progress',
  props<{ id: number; token: string }>()
);
export const userProgressResponse = createAction(
  '[User] User Progress Response',
  props<{ result: any }>()
);

export const userActivities = createAction(
  '[User] User Activities',
  props<{ id: number; token: string }>()
);
export const userActivitiesResponse = createAction(
  '[User] User Activities Response',
  props<{ result: any }>()
);
export const updateUserProgress = createAction(
  '[User] Update User Progress',
  props<{ progress: UserProgress; token: string }>()
);
export const updateUserProgressResponse = createAction(
  '[User] Update User Progress Response',
  props<{ result: any }>()
);
export const getActivityById = createAction(
  '[User] Get Activity By Id',
  props<{ id: number; token: string }>()
);
export const getActivityByIdResponse = createAction(
  '[User] Get Activity by Id response',
  props<{ result: any }>()
);
