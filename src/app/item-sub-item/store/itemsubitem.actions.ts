import { ItemSubItem } from '../model/itemsubitem.model';
import { createAction, props } from '@ngrx/store';

export const loadItemSubItens = createAction('LOAD_ITEMSUBITENS');

export const itemSubItensLoaded = createAction(
  'LOAD_ITEMSUBITENS_LOADED',
  props<{ itemsubitens: ItemSubItem[] }>()
);

export const createItemSubItem = createAction(
  'CREATE_ITEMSUBITEM',
  props<{ itemsubitens: ItemSubItem[] }>()
);

export const deleteItemSubItem = createAction(
  'DELETE_ITEMSUBITEM',
  props<{ itemId: string }>()
);

export const itemSubItemActionTypes = {
  loadItemSubItens,
  createItemSubItem,
  deleteItemSubItem,
  itemSubItensLoaded,
};
