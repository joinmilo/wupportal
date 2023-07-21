import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './account/account.component';
import { PortalComponent } from './portal/portal.component';

const routes: Routes = [
  {
    path: 'portal',
    loadChildren: () => import('./portal/portal.module')
      .then((imported) => imported.PortalModule),
    component: PortalComponent,
  },
  
    {
    path: 'account',
      loadChildren: () => import('./account/account.module')
      .then((imported) => imported.AccountModule),
    component: AccountComponent,
  },

  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/portal',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
