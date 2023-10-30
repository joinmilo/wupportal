import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { id } from 'src/app/core/constants/queryparam.constants';
import { AdminSettingsRoleFormComponent } from './components/form/admin-settings-role-form.component';
import { AdminSettingsRoleOverviewComponent } from './components/overview/admin-settings-role-overview.component';

const routes: Routes = [
  {
    path: '',
    component: AdminSettingsRoleOverviewComponent,
  },
  {
    path: 'form',
    component: AdminSettingsRoleFormComponent,
  },
  {
    path: `:${id}/form`,
    component: AdminSettingsRoleFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSettingsRoleRoutingModule { }
