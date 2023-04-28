import { Injectable } from '@angular/core';
import { User } from 'src/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || ('false'));
  constructor() { }
  public setLoginStatus(user: User) {
    this.loggedInStatus = user;
    localStorage.setItem('loggedIn', JSON.stringify(user));
  }
  public get LoginStatus() {
    return !!(JSON.parse(localStorage.getItem('loggedIn') ||
      this.loggedInStatus.toString()));
  }
}
