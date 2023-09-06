import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AdminActions } from 'src/app/admin/state/admin.actions';
import { AdminSettingsRoutes } from 'src/app/admin/typings/menu';

const cmsUrl = 'cms';

const routes: AdminSettingsRoutes[] = [
  {
    path: `${cmsUrl}/overview`,
    loadComponent: () => import('./pages-overview/admin-settings-pages-overview.component')
      .then((imported) => imported.AdminSettingsPagesOverviewComponent),
    data: {
      name: 'pagesOverview',
      description: 'pagesOverviewDescription',
      icon: 'file-lines'
    }
  },
  {
    path: `${cmsUrl}/landing`,
    loadComponent: () => import('./landing-form/admin-settings-landing-form.component')
      .then((imported) => imported.AdminSettingsLandingFormComponent),
    data: {
      name: 'editLandingPage',
      description: 'editLandingPageDescription',
      icon: 'house'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild([
    ...routes,
  ])],
  exports: [RouterModule]
})
export class AdminSettingsCmsRoutingModule {

  constructor(
    public store: Store
  ) {
    this.store.dispatch(AdminActions.addSettingsMenu({
      name: 'managePortalContent',
      childs: routes.map(route => ({
        name: route.data?.name,
        description: route.data?.description,
        route: route.path,
        icon: route.data?.icon
      }))
    }));
  }
}
