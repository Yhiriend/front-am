import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
    }),
  };

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };

    return this.http
      .post(`${environment.users}/login`, body, this.options)
      .pipe(
        map((response: any) => response),
        catchError((error: any) => {
          throw error;
        })
      );
  }

  register(user: User): Observable<any> {
    const body = user;
    return this.http.post(`${environment.users}/signin`, body, this.options).pipe(
      map((response: any) => response),
      catchError((error: any) => {
        throw error;
      })
    )
  }
}
