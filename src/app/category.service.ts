import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    return this.db.list('/categories', query => query.orderByChild('name'))
      .snapshotChanges().pipe(map(actions => {
        return actions.map(action => {
          const key = action.payload.key;
          const value = action.payload.exportVal();
          return { key, ...value };
        });
      }));
  }
}
