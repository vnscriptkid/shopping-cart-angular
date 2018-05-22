import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return true;
    return this.authService.user$.map(user => {
      if (user) {
        return true;
      } else {
        console.log('state: ', state.url);
        console.log('route: ', route);
        // localStorage.setItem('returnUrl', state.url);
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      }
    });
  }

}
