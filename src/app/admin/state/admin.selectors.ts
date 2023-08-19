import { createFeatureSelector, createSelector } from '@ngrx/store';
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

export const selectRoutes = createSelector(
  selectAdminState,
  state => state.routes
);

export const selectAdminMenu = createSelector(
  selectFeatures,
  selectRoutes,
  (features, routes) => {
    return routes.map(route => {
      const feature = features?.find(feature => feature.code === route.code)

      return {
        icon: feature?.icon,
        name: feature?.name,
        route: route?.routes.length === 1
          ? route.routes[0].path
          : undefined,
        childs: route?.routes.length > 1
          ? route?.routes.map(child => ({
              name: child?.data?.['label'],
              route: child.path
            }) as AdminMenuItem)
          : undefined
      } as AdminMenuItem

    }) as AdminMenuItem[]
  }
);