import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adminUrl } from 'src/app/core/constants/core.constants';
import { adminStateKey } from '../constants/admin.constants';
import { AdminMenuItem } from '../typings/menu';
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
  features => {
    return features?.map(feature => ({
      icon: feature.icon,
      name: feature.name,
      route: ['/', adminUrl, feature.code],
    })) as AdminMenuItem[]
  }
);