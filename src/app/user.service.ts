import { Observable } from 'rxjs/Observable';
import { User } from './models/app-user';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable, Optional } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class UserService {

  constructor(private afdb: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.afdb.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): Observable<any> {
    // return this.afdb.object('/users/' + uid);
    return this.afdb.object('/users/' + uid).valueChanges();
  }

}
