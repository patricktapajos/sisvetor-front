import { SubItemState } from './subitem.reducers';
import { SubItem } from '../model/subitem.model';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAll, selectIds } from './subitem.reducers';

export const subitemFeatureSelector = createFeatureSelector<SubItemState>(
  'subitens'
);

export const getAllItens = createSelector(subitemFeatureSelector, selectAll);

export const areItensLoaded = createSelector(
  subitemFeatureSelector,
  (state) => state.subItensLoaded
);
