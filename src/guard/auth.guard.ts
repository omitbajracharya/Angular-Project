import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { AuthService } from 'src/shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private _authService: AuthService, private messageService: MessageService) { }
 canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean | Observable<boolean> | Promise<boolean> {
      if (!this._authService.LoginStatus) { //if not login
        this.router.navigate(['login']);
      }
      return !!this._authService.LoginStatus;
      
  }

}
