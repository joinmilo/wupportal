import { createFeatureSelector, createSelector } from '@ngrx/store';
import { portalStateKey } from '../constants/portal.constants';
import { PortalState } from './portal.reducer';

export const selectPortalState = createFeatureSelector<PortalState>(portalStateKey);

export const selectPortalMenu = createSelector(
  selectPortalState,
  state => state.menu
);