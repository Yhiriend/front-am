import { createAction, props } from "@ngrx/store";

export const login = createAction('[Auth/Login] Logging in', props<{email: string, password: string}>());
export const loginResponse = createAction('[Auth/Login] Login Response', props<{result: any}>());