import { createAction, props } from "@ngrx/store";

export const startLoading = createAction('[Loader] Start Loading');
export const stopLoading = createAction('[Loader] Stop Loading');