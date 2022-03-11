import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.login.subscribe(response => {
      console.log(response)
    })
    // this.loginService.getUser().subscribe(response => {
    //   console.log(response)
    // })
  }



}
