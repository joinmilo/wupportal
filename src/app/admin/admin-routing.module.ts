import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLandingComponent } from './shared/landing/admin-landing.component';

const routes: Routes = [
  
  {
    path: 'notifications',
    loadChildren: () => import('../shared/pages/notification/notification.module')
      .then((imported) => imported.NotificationModule),
  },
  {
    path: '404',
    loadChildren: () => import('../shared/pages/not-found/not-found.module')
      .then((imported) => imported.NotFoundModule),
  },
  {
    path: '',
    component: AdminLandingComponent
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
