import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AdminActions } from 'src/app/admin/state/admin.actions';
import { AdminSettingsRoutes } from 'src/app/admin/typings/menu';

const baseRoute = 'access';

const routes: AdminSettingsRoutes[] = [
  {
    path: `${baseRoute}/user`,
    loadComponent: () => import('./user/admin-settings-user.component')
      .then((imported) => imported.AdminSettingsUserComponent),
    data: {
      name: 'users',
      description: 'usersDescription',
      icon: 'users'
    }
  },
  {
    path: `${baseRoute}/role`,
    loadComponent: () => import('./user/admin-settings-user.component')
      .then((imported) => imported.AdminSettingsUserComponent),
    data: {
      name: 'roles',
      description: 'rolesDescription',
      icon: 'user-gear'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild([
    ...routes,
  ])],
  exports: [RouterModule]
})
export class AdminSettingsAccessRoutingModule {

  constructor(
    public store: Store
  ) {
    this.store.dispatch(AdminActions.addSettingsMenu({
      name: 'access',
      childs: routes.map(route => ({
        name: route.data?.name,
        description: route.data?.description,
        route: route.path,
        icon: route.data?.icon
      }))
    }));
  }
}
