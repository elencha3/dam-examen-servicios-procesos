import { RegisterModel } from './../models/register.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const LOGIN_KEY = 'login';
const REGISTER_KEY = 'register'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  //Observable
  private loginModelBehaviourSubject: BehaviorSubject<LoginModel | null>;
  public login: Observable<LoginModel | null>;

  private registerModelBehaviourSubject: BehaviorSubject<any | null>;

  public register : Observable<any|null>;

  constructor(private http: HttpClient, private route: Router) {
    this.loginModelBehaviourSubject = new BehaviorSubject<LoginModel | null>(
      JSON.parse(<string>localStorage.getItem(LOGIN_KEY))
    );
    this.login = this.loginModelBehaviourSubject.asObservable();
    this.registerModelBehaviourSubject = new BehaviorSubject<RegisterModel | null>(
      JSON.parse(<string>localStorage.getItem(REGISTER_KEY))
    );
    this.register = this.registerModelBehaviourSubject.asObservable();
  }

  //LOGIN
  performLogin(entrada: LoginModel): Observable<LoginModel> {
    console.log('performLogin(' + JSON.stringify(entrada) + ')');

    return this.http.post<LoginModel>(environment.login, entrada).pipe(
      map((retornoAPI) => {
        //Hacer algo
        console.log('Login ok' + JSON.stringify(retornoAPI));
        this.loginModelBehaviourSubject.next(retornoAPI);
        localStorage.setItem(LOGIN_KEY, JSON.stringify(retornoAPI));
        return retornoAPI;
      })
    );
  }

  performLogout() {
    localStorage.removeItem(LOGIN_KEY);
    this.loginModelBehaviourSubject.next(null);
    this.route.navigate(['/login']);
  }

  //REGISTER

  registerUser(user: RegisterModel): Observable<any> {
    return this.http.post<RegisterModel>(environment.register, user).pipe(map((apiResponse) => {
      console.log('Register ok' + JSON.stringify(apiResponse));
        this.registerModelBehaviourSubject.next(apiResponse);
        localStorage.setItem(REGISTER_KEY, JSON.stringify(apiResponse));
        return apiResponse;
    }))
  }

  //GET USERS

  getUser(id: number | null): Observable<any> {

    let url =`${environment.user}/${id}`;
    return this.http.get(url)
  }
}
