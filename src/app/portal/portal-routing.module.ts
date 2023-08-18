import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { slug } from '../core/constants/core.constants';
import { PortalLandingComponent } from './modules/landing/component/portal-landing.component';

const routes: Routes = [
  {
    path: 'notifications',
    loadChildren: () => import('src/app/shared/pages/notification/notification.module')
      .then((imported) => imported.NotificationModule),
  },
  {
    path: 'search',
    loadChildren: () => import('src/app/shared/pages/search/search.module')
      .then((imported) => imported.PortalSearchModule),
  },
  {
    path: '404',
    loadChildren: () => import('src/app/shared/pages/not-found/not-found.module')
      .then((imported) => imported.NotFoundModule),
  },
  {
    path: `:${slug}`,
    loadChildren: () => import('./modules/page/portal-page.module')
      .then((imported) => imported.PortalPageModule),
  },
  {
    path: '',
    loadChildren: () => import('./modules/landing/portal-landing.module')
      .then((imported) => imported.PortalLandingModule),
    component: PortalLandingComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
