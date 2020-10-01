import { SubItem } from '../model/subitem.model';
import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

export const loadSubItens = createAction(
  '[SubItens List] Load SubItens via Service'
);

export const subItensLoaded = createAction(
  '[SubItens Effect] SubItens Loaded Successfully',
  props<{ subItens: SubItem[] }>()
);

export const createSubItem = createAction(
  '[Create SubItem Component] Create SubItem',
  props<{ subItem: SubItem }>()
);

export const deleteSubItem = createAction(
  '[SubItens List Operations] Delete SubItem',
  props<{ subItemId: string }>()
);

export const updateSubItem = createAction(
  '[SubItens List Operations] Update SubItem',
  props<{ update: Update<SubItem> }>()
);

export const subItemActionTypes = {
  loadSubItens,
  subItensLoaded,
  createSubItem,
  deleteSubItem,
  updateSubItem,
};
