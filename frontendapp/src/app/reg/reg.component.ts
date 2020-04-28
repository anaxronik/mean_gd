import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  userRegisterClick() {
    console.log('userRegisterClick()', this.name)
    return false
  }

}
