import { Injectable } from '@angular/core';
import { User } from 'src/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
  public setLoginStatus(user: User) {
    localStorage.setItem('loggedIn', JSON.stringify(user));
  }
  public get LoginStatus() {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn) {
      try {
        return JSON.parse(loggedIn);
      } catch (error) {
        console.error('Error parsing loggedIn value:', error);
      }
    }
    return false;
  }
}
