import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, ActivatedRoute,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../login/user';
import { LoginService } from '../login/login.service';

declare var window:any;

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  user: User;
  constructor(
    private router: Router,
    private ac: ActivatedRoute
  ) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.user = JSON.parse(window.localStorage.getItem('user'));
    if (this.user && this.user.token) {
      return true;
    }
    this.router.navigate(['/login'], {
      queryParams: {
        destination: state.url
      }
    });
    return false;
  }
  canLoad() {
    return true;
  }
}