import { createFeatureSelector, createSelector } from '@ngrx/store';
import { portalPageStateKey } from '../constants/portal-page.constants';
import { PortalPageState } from './portal-page.reducer';

export const selectPortalPageState = createFeatureSelector<PortalPageState>(portalPageStateKey);

export const selectPage = createSelector(
  selectPortalPageState,
  state => state.page
);