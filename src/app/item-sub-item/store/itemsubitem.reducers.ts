import { ItemSubItem } from './../model/itemsubitem.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { itemSubItemActionTypes } from './itemsubitem.actions';

export interface ItemSubItemState extends EntityState<ItemSubItem> {
  itemSubItensLoaded: boolean;
}

export const adapter: EntityAdapter<ItemSubItem> = createEntityAdapter<
  ItemSubItem
>();

export const initialISIState = adapter.getInitialState({
  itemSubItensLoaded: false,
});

export const itemSubItemReducer = createReducer(
  initialISIState,

  on(itemSubItemActionTypes.itemSubItensLoaded, (state, action) => {
    return adapter.addAll(action.itemsubitens, {
      ...state,
      itemSubItensLoaded: true,
    });
  }),

  on(itemSubItemActionTypes.createItemSubItem, (state, action) => {
    return adapter.addMany(action.itemsubitens, state);
  }),

  on(itemSubItemActionTypes.deleteItemSubItem, (state, action) => {
    return adapter.removeOne(action.itemId, state);
  })
);

export const { selectAll, selectIds } = adapter.getSelectors();
