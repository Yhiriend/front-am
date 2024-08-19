import { createAction, props } from "@ngrx/store";
import { User } from "../../../../models/user.model";

export const register = createAction('[Auth/Register] Registering', props<{user: User}>());
export const registerResponse = createAction('[Auth/Register] Register Response', props<{result: any}>());