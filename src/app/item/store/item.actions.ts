import { Item } from '../model/item.model';
import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

export const loadItens = createAction('[Itens List] Load Itens via Service');

export const itensLoaded = createAction(
  '[Itens Effect] Itens Loaded Successfully',
  props<{ itens: Item[] }>()
);

export const createItem = createAction(
  '[Create Item Component] Create Item',
  props<{ item: Item }>()
);

export const deleteItem = createAction(
  '[Itens List Operations] Delete Item',
  props<{ itemId: string }>()
);

export const updateItem = createAction(
  '[Itens List Operations] Update Item',
  props<{ update: Update<Item> }>()
);

export const itemActionTypes = {
  loadItens,
  itensLoaded,
  createItem,
  deleteItem,
  updateItem,
};
