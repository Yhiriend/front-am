import { createReducer, on } from '@ngrx/store';
import { loginResponse } from '../login/actions/login.actions';
import { startLoading, stopLoading } from './auth.actions';
import { registerResponse } from '../register/actions/register.actions';

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  userLoggedIn: any | null;
  isLoading: boolean;
}

export const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  userLoggedIn: null,
  isLoading: false,
};

export const authReducer = createReducer(
  initialState,
  on(loginResponse, (state, { result }) => ({
    ...state,
    token: result.token ?? result.msg,
    isAuthenticated: result.msg ? false : true,
    userLoggedIn: result.data ?? null,
  })),
  on(startLoading, (state) => ({ ...state, isLoading: true })),
  on(stopLoading, (state) => ({ ...state, isLoading: false })),
  on(registerResponse, (state, { result }) => ({ ...state, token: result.msg }))
);
