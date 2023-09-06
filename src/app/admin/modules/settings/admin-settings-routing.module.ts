import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '404',
    loadChildren: () => import('../../../shared/pages/not-found/not-found.module')
      .then(imported => imported.NotFoundModule),
  },
  {
    path: '',
    loadComponent: () => import('./landing/admin-settings-landing.component')
      .then(imported => imported.AdminSettingsLandingComponent)
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
export class AdminSettingsRoutingModule { }
