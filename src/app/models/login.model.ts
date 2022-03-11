export class LoginModel {
  public email: String;
  public password: String;
  public token: String;

  constructor(email: String, password: String, token: String) {
    this.email = email
    this.password = password
    this.token = token
  }
}
