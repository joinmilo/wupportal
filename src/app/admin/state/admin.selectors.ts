import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adminStateKey } from '../constants/admin.constants';
import { AdminMenuItem } from '../typings/menu';
import { createAdminRoutes } from '../utils/admin-routes.utils';
import { AdminState } from './admin.reducer';

export const selectAdminState = createFeatureSelector<AdminState>(adminStateKey);

export const selectIsAdminMenuOpen = createSelector(
  selectAdminState,
  state => state.menuOpen
);

export const selectFeatures = createSelector(
  selectAdminState,
  state => state.features
);

export const selectAdminMenu = createSelector(
  selectFeatures,
  features => features?.map(feature => ({
    icon: feature.icon,
    name: feature.name,
    route: createAdminRoutes(feature.code),
  })) as AdminMenuItem[]
);