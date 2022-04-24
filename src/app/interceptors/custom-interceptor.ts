import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler) {
    return next.handle(
      httpRequest.clone({
        withCredentials: true,
        setHeaders: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
    );
  }
}
