import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  sent: boolean = false;
  errorMsg!: string | null;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService)
    {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }



  submitForm() {
    let userLogin: LoginModel = new LoginModel(
      this.loginForm.controls.username.value,
      this.loginForm.controls.password.value,
      ""
    );
    this.sent = true;
    if (!this.loginForm.valid)
      return;
    this.isLoading = true;
    //Llamada al back
    this.loginService
    .performLogin(userLogin)
    .subscribe( response => {
      console.log(JSON.stringify(response));
      this.isLoading = false;
      this.errorMsg = null;
    }, error => {
      this.errorMsg = `⚠ El usuario no existe (${error.error?.error})`
      this.isLoading = false;
    },
    () => {
      this.isLoading = false;
    })

  }

}
