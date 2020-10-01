import {
  subItemActionTypes,
  subItensLoaded,
  updateSubItem,
} from './subitem.actions';
import { SubItemService } from '../services/subitem.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class SubItemEffects {
  loadItens$ = createEffect(() =>
    this.actions$.pipe(
      ofType(subItemActionTypes.loadSubItens),
      concatMap(() => this.subItemService.getAll()),
      map((subItens) => subItemActionTypes.subItensLoaded({ subItens }))
    )
  );

  createCourse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(subItemActionTypes.createSubItem),
        concatMap((action) => this.subItemService.create(action.subItem)),
        tap(() => this.router.navigateByUrl('/subitens'))
      ),
    { dispatch: false }
  );

  deleteCourse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(subItemActionTypes.deleteSubItem),
        concatMap((action) => this.subItemService.delete(action.subItemId))
      ),
    { dispatch: false }
  );

  updateCOurse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(subItemActionTypes.updateSubItem),
        concatMap((action) =>
          this.subItemService.update(action.update.id, action.update.changes)
        )
      ),
    { dispatch: false }
  );

  constructor(
    private subItemService: SubItemService,
    private actions$: Actions,
    private router: Router
  ) {}
}
