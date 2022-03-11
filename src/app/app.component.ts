import { Component } from '@angular/core';
import { LoginModel } from './models/login.model';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-setup';

  user!: LoginModel |null;

  constructor(private loginService: LoginService) {
    loginService.login.subscribe(user =>{
      this.user = user;
    })
  }

  hayUsuario() {
    return this.user != null;
  }

  logout():void {
    this.loginService.performLogout();
  }
}
