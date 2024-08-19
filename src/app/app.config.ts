import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './modules/auth/auth-state/auth.reducer';
import { AuthEffects } from './modules/auth/auth-state/auth.effects';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { UserEffects } from './modules/user/effects/user.effects';
import { userReducer } from './modules/user/reducer/user.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(withFetch()) , provideStore({auth: authReducer, user: userReducer}), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideEffects(AuthEffects, UserEffects)]
};
