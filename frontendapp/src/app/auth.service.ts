import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'
import { map } from 'rxjs/operators'
import { tokenNotExpired } from 'angular2-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any
  user: any

  constructor(private http: Http) { }

  registerUser(user) {
    const url = 'https://mean-gd.herokuapp.com/account/reg'
    console.log('Try send info on:', url)
    let headers = new Headers()
    headers.append('Content-type', 'application/json')
    return this.http.post(
      url,
      user,
      { headers: headers }).pipe(map(res => res.json()))
  }

  authUser(user) {
    const url = 'https://mean-gd.herokuapp.com/account/auth'
    console.log('Try send info on:', url)
    let headers = new Headers()
    headers.append('Content-type', 'application/json')
    return this.http.post(
      'account/auth',
      user,
      { headers: headers }).pipe(map(res => res.json()))
  }

  storeUser(token, user) {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    this.token = token
    this.user = user
  }

  logout() {
    this.token = null
    this.user = null
    localStorage.clear()
  }

  isLoggedIn() {
    return tokenNotExpired()
  }

}
