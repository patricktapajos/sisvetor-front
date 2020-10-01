import { areItensLoaded } from './store/subitem.selectors';
import { loadSubItens, subItensLoaded } from './store/subitem.actions';
import { AppState } from '../store/reducers/index';
import { SubItem } from './model/subitem.model';
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
export class SubItemResolver implements Resolve<Observable<any>> {
  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(areItensLoaded),
      tap((subItensLoaded) => {
        if (!subItensLoaded) {
          this.store.dispatch(loadSubItens());
        }
      }),
      filter((subItensLoaded) => subItensLoaded),
      first()
    );
  }
}
