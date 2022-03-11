import { LoginService } from './../../services/login.service';
import { RegisterModel } from './../../models/register.model';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  sent: boolean = false;

  constructor(private formbuilder: FormBuilder, private router: Router, private loginService: LoginService) {}
  mustMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    let passVal = control.get('password');
    let passConfirmVal = control.get('passwordConfirmation');

    return passVal?.value === passConfirmVal?.value ? null : { noMatch: true };
  };

  registerForm = this.formbuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password:['', Validators.required],
      passwordConfirmation: [''],
      company: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      experience: ['', Validators.required],
      dni: ['', Validators.required],
    },
    { validators: this.mustMatchValidator }
  );

  doPerformSubmit() {
    this.sent = true;

    if (this.registerForm.valid) {
      let user: RegisterModel = new RegisterModel(
        this.registerForm.value.email,
        this.registerForm.value.password,
        this.registerForm.value.company,
        this.registerForm.value.name,
        this.registerForm.value.surname,
        this.registerForm.value.experience,
        this.registerForm.value.dni,
      );
        this.loginService.registerUser(user).subscribe( response =>{
          console.log(JSON.stringify(response));
          this.router.navigate(['/login'])
        },
        error =>{
          console.log(error)
        }
        )

    }
  }

  ngOnInit(): void {}
}
