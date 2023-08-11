import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutComponent } from './account/components/layout/account-layout.component';
import { AdminLayoutComponent } from './admin/shared/layout/components/admin-layout.component';
import { accountUrl, adminUrl, portalUrl, userUrl } from './core/constants/core.constants';
import { PortalLayoutComponent } from './portal/shared/layout/portal-layout.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: portalUrl,
    loadChildren: () => import('./portal/portal.module')
      .then((imported) => imported.PortalModule),
    component: PortalLayoutComponent,
  },
  {
    path: adminUrl,
    loadChildren: () => import('./admin/admin.module')
      .then((imported) => imported.AdminModule),
    component: AdminLayoutComponent,
  },
  {
    path: accountUrl,
      loadChildren: () => import('./account/account.module')
      .then((imported) => imported.AccountModule),
    component: AccountLayoutComponent,
  },
  {
    path: userUrl,
      loadChildren: () => import('./user/user.module')
      .then((imported) => imported.UserModule),
    component: UserComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: `/${portalUrl}`,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
