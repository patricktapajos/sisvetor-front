import { Item } from '../model/item.model';
import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

export const loadItens = createAction('[Itens List] Load Itens via Service');

export const itensLoaded = createAction(
  'LOAD_ITENS_LOADED',
  props<{ itens: Item[] }>()
);

export const createItem = createAction('CREATE_ITEM', props<{ item: Item }>());

export const deleteItem = createAction(
  'DELETE_ITEM',
  props<{ itemId: string }>()
);

export const updateItem = createAction(
  'UPDATE_ITEM',
  props<{ update: Update<Item> }>()
);

export const itemActionTypes = {
  loadItens,
  itensLoaded,
  createItem,
  deleteItem,
  updateItem,
};
