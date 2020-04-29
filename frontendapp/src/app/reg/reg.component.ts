import { Component, OnInit } from '@angular/core';
import { CheckFormService } from '../check-form.service'
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  name: String
  login: String
  email: String
  password: String

  constructor(
    private checkForm: CheckFormService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  userRegisterClick() {
    const user = {
      name: this.name,
      login: this.login,
      email: this.email,
      password: this.password,
    }

    if (!this.checkForm.checkName(user.name)) {
      console.log('user name invalid')
    }

    if (!this.checkForm.checkLogin(user.login)) {
      console.log('user login invalid')
    }

    if (!this.checkForm.checkEmail(user.email)) {
      console.log('user email invalid')
    }

    if (!this.checkForm.checkPassword(user.password)) {
      console.log('user password invalid')
    }

    this.authService.registerUser(user).subscribe(data => {
      if (!data.success) {
        console.log('Registration incorect')
      }
      this.router.navigate(['/auth'])
    })

  }

}
