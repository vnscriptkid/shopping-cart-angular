import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories(): Observable<any> {
    return this.db.object('/categories').valueChanges().map(result => {
      return Object.keys(result).map(key => ({ name: result[key].name, key: key} ));
    });
  }

}
