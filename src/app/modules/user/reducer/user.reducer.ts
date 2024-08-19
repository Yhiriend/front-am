import { createReducer, on } from '@ngrx/store';
import {
  updateUserProgressResponse,
  updateUserResponse,
  userActivitiesResponse,
  userProgressResponse as generalUserProgressResponse,
  getActivityByIdResponse,
} from '../actions/user.actions';

export interface UserState {
  updated: boolean | null;
  progress: any[] | null;
  hasProgressBeenUpdated: boolean | null;
  activities: any | null;
  hasAccess: boolean | null;
}

export const initialState: UserState = {
  updated: null,
  progress: null,
  hasProgressBeenUpdated: null,
  activities: null,
  hasAccess: null,
};

export const userReducer = createReducer(
  initialState,
  on(updateUserResponse, (state, { result }) => ({
    ...state,
    updated: result.msg,
    hasAccess: result.msg ? true : false,
  })),
  on(generalUserProgressResponse, (state, { result }) => ({
    ...state,
    progress: result.data ? result.data : null,
    hasAccess: result.data ? true : false,
  })),
  on(userActivitiesResponse, (state, { result }) => ({
    ...state,
    activities: result.data ? result.data : null,
  })),
  on(updateUserProgressResponse, (state, { result }) => ({
    ...state,
    hasProgressBeenUpdated: result.msg,
  })),
  on(getActivityByIdResponse, (state, {result}) => ({...state, activities: result}))
);
