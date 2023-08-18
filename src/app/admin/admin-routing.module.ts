import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'notifications',
    loadChildren: () => import('../shared/pages/notification/notification.module')
      .then((imported) => imported.NotificationModule),
  },
  {
    path: '404',
    loadChildren: () => import('../shared/pages/not-found/not-found.module')
      .then(imported => imported.NotFoundModule),
  },
  { path: '',
    loadComponent: () => import('./modules/landing/admin-landing.component')
      .then(imported => imported.AdminLandingComponent)
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
export class AdminRoutingModule { }
