import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { UserProgress } from '../../models/userprogress';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getOptions(token: string) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':
          'https://back-am-production.up.railway.app',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  update(
    user: User,
    newPassword: string | null,
    token: string
  ): Observable<any> {
    const body = { user, newPassword };

    const options = this.getOptions(token);

    return this.http.post(`${environment.users}/update`, body, options).pipe(
      map((response: any) => response),
      catchError((error: any) => {
        throw error;
      })
    );
  }

  getProgress(id: number, token: string): Observable<any> {
    const body = { id };
    const options = this.getOptions(token);
    return this.http
      .post(`${environment.acitivity}/progress/general`, body, options)
      .pipe(
        map((response: any) => response),
        catchError((error: any) => {
          throw error;
        })
      );
  }

  getActivities(id: number, token: string): Observable<any> {
    const body = { id };

    const options = this.getOptions(token);

    return this.http
      .post(`${environment.acitivity}/get-by-user`, body, options)
      .pipe(
        map((response: any) => response),
        catchError((error: any) => {
          throw error;
        })
      );
  }

  updateProgress(progress: UserProgress, token: string): Observable<any> {
    const body = progress;

    const options = this.getOptions(token);
    return this.http
      .post(`${environment.acitivity}/progress/update`, body, options)
      .pipe(
        map((response: any) => response),
        catchError((error: any) => {
          throw error;
        })
      );
  }

  getActivityById(id: number, token: string): Observable<any> {
    const body = { id };
    const options = this.getOptions(token);
    return this.http.post(`${environment.acitivity}/get`, body, options).pipe(
      map((response: any) => response),
      catchError((error: any) => {
        throw error;
      })
    );
  }
}
