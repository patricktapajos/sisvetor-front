import { ItemState } from './item.reducers';
import { Item } from './../model/item.model';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAll, selectIds } from './item.reducers';

export const itemFeatureSelector = createFeatureSelector<ItemState>('itens');

export const getAllItens = createSelector(itemFeatureSelector, selectAll);

export const areItensLoaded = createSelector(
  itemFeatureSelector,
  (state) => state.itensLoaded
);
