import { LoginService } from './../services/login.service';
import { LoginModel } from './../models/login.model';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  user!: LoginModel | null;
  token!: String | undefined;

  constructor(private loginService: LoginService) {
    this.loginService.login.subscribe( user => {
      this.user = user
      this.token = this.user?.token;
    })
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(this.token !== undefined) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${this.token}`
        }
      })
    }

    return next.handle(request);
  }
}
