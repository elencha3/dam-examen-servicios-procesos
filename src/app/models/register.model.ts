export class RegisterModel {



  constructor(
    email: string,
    password: string,
    company: string,
    name: string,
    surname: string,
    experience: string,
    dni: string
) {
    this.email = email
    this.password = password
    this.company = company
    this.name = name
    this.surname = surname
    this.experience = experience
    this.dni = dni
  }
  private email: string
  private password: string
  private company: string
  private name: string
  private surname: string
  private experience: string
  private dni: string

}
