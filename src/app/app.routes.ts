import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./modules/auth/login/login-component/login.component')
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./modules/dashboard/dashboard.component')
    },
    {
        path: 'register',
        loadComponent: () => import('./modules/auth/register/register-component/register.component')
    },
    {
        path: 'activity',
        loadComponent: () => import('./modules/activities/activities.component'),
    },
    {
      path: 'activity/game-launcher',
      loadComponent: () => import('./modules/game-launcher/game-launcher.component')
    },
    {
        path: 'settings',
        loadComponent: () => import('./modules/user/profile/profile.component')
    }
];
