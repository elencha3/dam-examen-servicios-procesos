import { LoginService } from './../services/login.service';
import { LoginModel } from './../models/login.model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user!: LoginModel | null

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.user != null;
  }
  constructor(private loginService: LoginService) {
    this.loginService.login.subscribe(user => {
      this.user = user
    })
  }
}
