import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthForAlreadyLoginGuard implements CanActivate {
  constructor(private router: Router, private _authService: AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
      if (!!this._authService.LoginStatus) {  //if login
        this.router.navigate(['home/home-page']);
      }
      return !this._authService.LoginStatus;
 
  }

}
