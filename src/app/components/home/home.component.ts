import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/models/login.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user!: LoginModel | null
  name?: string
  id: number | undefined

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.register.subscribe(response => {
      this.id = response.id
    })
    this.getUser(this.id)

    this.loginService.login.subscribe(response => {
      this.user = response
    })
  }

  public getUser(id:any) {
    this.loginService.getUser(id).subscribe(response => {
      this.name = response.data.first_name
    })
  }

  isLogged() {
    return this.user != null;
  }


}
