import { Observable } from 'rxjs/Observable';
import { User } from './models/app-user';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable()
export class AdminGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  canActivate() {
    return this.authService.user$
      .switchMap(user => {
        if (user) {
          console.log('uid: ', user.uid);
          return this.userService.get(user.uid);
        }
        return Observable.of({});
      })
      .map(user => {
        if (user.isAdmin) {
          console.log('is Admin: ', user.isAdmin);
          return true;
        }
        return false;
      });
  }
}
