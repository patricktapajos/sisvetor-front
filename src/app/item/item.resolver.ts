import { areItensLoaded } from './store/item.selectors';
import { loadItens, itensLoaded } from './store/item.actions';
import { AppState } from '../store/reducers/index';
import { Item } from './model/item.model';
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
export class ItemResolver implements Resolve<Observable<any>> {
  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(areItensLoaded),
      tap((itensLoaded) => {
        if (!itensLoaded) {
          this.store.dispatch(loadItens());
        }
      }),
      filter((itensLoaded) => itensLoaded),
      first()
    );
  }
}
