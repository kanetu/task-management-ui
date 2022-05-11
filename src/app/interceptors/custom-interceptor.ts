import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler) {
    return next
      .handle(
        httpRequest.clone({
          withCredentials: true,
          setHeaders: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }),
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            //  Handle client-side error
          } else {
            // Handle server-side error
            // -> i.e 401, 404, 500, etc..
            // -> Also refresh token for expired token
            switch (error.status) {
              case 401:
                // login
                this.router.navigate(['/welcome/login']);
                break;
              case 403:
                // forbidden
                break;
              case 404:
                // not found
                break;
              case 500:
                // internal server error
                break;
            }
          }
          return throwError(error);
        }),
      );
  }
}
