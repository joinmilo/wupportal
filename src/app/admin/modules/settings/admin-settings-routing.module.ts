import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { settingsUrl } from 'src/app/core/constants/module.constants';

const routes: Routes = [
  {
    path: settingsUrl,
    loadComponent: () => import('./navigation/admin-settings-navigation.component')
      .then(imported => imported.AdminSettingsNavigationComponent)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSettingsRoutingModule { }
