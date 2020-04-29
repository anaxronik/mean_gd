import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  login: String
  password: String

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  userLoginClick() {
    const user = {
      login: this.login,
      password: this.password,
    }

    if (user.login.trim() == '') {
      console.log('Login empty')
      return
    }


    if (user.password.trim() == '' || user.password.trim() == undefined) {
      console.log('Password incorrect')
      return
    }

    console.log('Try login', user)

    this.authService.authUser(user).subscribe(data => {
      if (!data.success) {
        console.log('error login')
      } else {
        console.log('Corect login')
        this.router.navigate(['dashboard'])
        this.authService.storeUser(data.token, data.user)
      }
    })
  }

}
