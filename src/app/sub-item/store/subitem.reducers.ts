import { SubItem } from '../model/subitem.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { subItemActionTypes, subItensLoaded } from './subitem.actions';

export interface SubItemState extends EntityState<SubItem> {
  subItensLoaded: boolean;
}

export const adapter: EntityAdapter<SubItem> = createEntityAdapter<SubItem>();

export const initialState = adapter.getInitialState({
  subItensLoaded: false,
});

export const subItemReducer = createReducer(
  initialState,

  on(subItemActionTypes.subItensLoaded, (state, action) => {
    return adapter.addAll(action.subItens, { ...state, subItensLoaded: true });
  }),

  on(subItemActionTypes.createSubItem, (state, action) => {
    return adapter.addOne(action.subItem, state);
  }),

  on(subItemActionTypes.deleteSubItem, (state, action) => {
    return adapter.removeOne(action.subItemId, state);
  }),

  on(subItemActionTypes.updateSubItem, (state, action) => {
    return adapter.updateOne(action.update, state);
  })
);

export const { selectAll, selectIds } = adapter.getSelectors();
