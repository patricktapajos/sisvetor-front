import { itemSubItemActionTypes } from './itemsubitem.actions';
import { ItemSubItemService } from './../services/itemsubitem.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ItemSubItemEffects {
  loadItemSubItens$ = createEffect(() =>
    this.actions$.pipe(
      ofType(itemSubItemActionTypes.loadItemSubItens),
      concatMap(() => this.itemSubItemService.getAll()),
      map((itemsubitens) =>
        itemSubItemActionTypes.itemSubItensLoaded({ itemsubitens })
      )
    )
  );

  createItemSubItem$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(itemSubItemActionTypes.createItemSubItem),
        concatMap((action) =>
          this.itemSubItemService.create(action.itemsubitens)
        ),
        tap(() => this.router.navigateByUrl('/itemsubitens'))
      ),
    { dispatch: false }
  );

  deleteItemSubItem$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(itemSubItemActionTypes.deleteItemSubItem),
        concatMap((action) => this.itemSubItemService.delete(action.itemId))
      ),
    { dispatch: false }
  );

  constructor(
    private itemSubItemService: ItemSubItemService,
    private actions$: Actions,
    private router: Router
  ) {}
}
