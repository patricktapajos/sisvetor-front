import { areItemSubItensLoaded } from './store/itemsubitem.selectors';
import {
  loadItemSubItens,
  itemSubItensLoaded,
} from './store/itemsubitem.actions';
import { AppState } from '../store/reducers/index';
import { ItemSubItem } from './model/itemsubitem.model';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { filter, finalize, first, tap } from 'rxjs/operators';

@Injectable()
export class ItemSubItemResolver implements Resolve<Observable<any>> {
  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(areItemSubItensLoaded),
      tap((itemSubItensLoaded) => {
        if (!itemSubItensLoaded) {
          this.store.dispatch(loadItemSubItens());
        }
      }),
      filter((itemSubItensLoaded) => itemSubItensLoaded),
      first()
    );
  }
}
