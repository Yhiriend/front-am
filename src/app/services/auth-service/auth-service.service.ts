import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user.model';
import { ToastService } from '../../shared/components/am-toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':
        'https://back-am-production.up.railway.app',
    }),
  };

  constructor(private http: HttpClient, private readonly toast: ToastService) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };

    return this.http
      .post(`${environment.users}/login`, body, this.options)
      .pipe(
        map((response: any) => response),
        catchError((error: any) => {
          if (error.status === 500) {
            this.toast.show(
              'error',
              'Error del Servidor',
              'Inténtalo de nuevo más tarde.'
            );
          }
          return error;
        })
      );
  }

  register(user: User): Observable<any> {
    const body = user;
    return this.http
      .post(`${environment.users}/signin`, body, this.options)
      .pipe(
        map((response: any) => response),
        catchError((error: any) => {
          throw error;
        })
      );
  }
}
