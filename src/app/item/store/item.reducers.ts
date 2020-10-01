import { Item } from './../model/item.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { itemActionTypes, itensLoaded } from './item.actions';

export interface ItemState extends EntityState<Item> {
  itensLoaded: boolean;
}

export const adapter: EntityAdapter<Item> = createEntityAdapter<Item>();

export const initialState = adapter.getInitialState({
  itensLoaded: false,
});

export const itemReducer = createReducer(
  initialState,

  on(itemActionTypes.itensLoaded, (state, action) => {
    return adapter.addAll(action.itens, { ...state, itensLoaded: true });
  }),

  on(itemActionTypes.createItem, (state, action) => {
    return adapter.addOne(action.item, state);
  }),

  on(itemActionTypes.deleteItem, (state, action) => {
    return adapter.removeOne(action.itemId, state);
  }),

  on(itemActionTypes.updateItem, (state, action) => {
    return adapter.updateOne(action.update, state);
  })
);

export const { selectAll, selectIds } = adapter.getSelectors();
