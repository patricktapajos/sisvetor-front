import { itemActionTypes, itensLoaded, updateItem } from './item.actions';
import { ItemService } from './../services/item.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ItemEffects {
  loadItens$ = createEffect(() =>
    this.actions$.pipe(
      ofType(itemActionTypes.loadItens),
      concatMap(() => this.itemService.getAll()),
      map((itens) => itemActionTypes.itensLoaded({ itens }))
    )
  );

  createCourse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(itemActionTypes.createItem),
        concatMap((action) => this.itemService.create(action.item)),
        tap(() => this.router.navigateByUrl('/itens'))
      ),
    { dispatch: false }
  );

  deleteCourse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(itemActionTypes.deleteItem),
        concatMap((action) => this.itemService.delete(action.itemId))
      ),
    { dispatch: false }
  );

  updateCOurse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(itemActionTypes.updateItem),
        concatMap((action) =>
          this.itemService.update(action.update.id, action.update.changes)
        )
      ),
    { dispatch: false }
  );

  constructor(
    private itemService: ItemService,
    private actions$: Actions,
    private router: Router
  ) {}
}
