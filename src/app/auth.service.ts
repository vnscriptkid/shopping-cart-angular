import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.user$ = afAuth.user;
    this.afAuth.auth.getRedirectResult().then(result => {
      console.log('resolved promise: ', result);
      if (result.user) {
        console.log('user active', result.user);
        userService.save(result.user);
        const returnUrl = localStorage.getItem('returnUrl');
        console.log('return Url', returnUrl);
        router.navigate([returnUrl]);
      }
    });
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    console.log(returnUrl);
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    // this.router.navigate(['/']);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
