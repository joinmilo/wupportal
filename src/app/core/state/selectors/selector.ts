import { createFeatureSelector, createSelector } from '@ngrx/store';
import { appStateKey } from '../../constants/core.constants';
import { AppState } from '../reducers/reducer';

export const selectAppState = createFeatureSelector<AppState>(appStateKey);

export const selectCoreState = createSelector(
  selectAppState,
  state => state.core
);

export const selectCoreUserState = createSelector(
  selectAppState,
  state => state.coreUser
);