import { ItemSubItemState } from './itemsubitem.reducers';
import { ItemSubItem } from './../model/itemsubitem.model';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAll, selectIds } from './itemsubitem.reducers';

export const itemFeatureSelector = createFeatureSelector<ItemSubItemState>(
  'itemsubitens'
);

export const getAllItemSubItens = createSelector(
  itemFeatureSelector,
  selectAll
);

export const areItemSubItensLoaded = createSelector(
  itemFeatureSelector,
  (state) => state.itemSubItensLoaded
);
