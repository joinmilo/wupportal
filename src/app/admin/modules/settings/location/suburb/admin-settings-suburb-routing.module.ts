import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { id } from 'src/app/core/constants/queryparam.constants';
import { AdminSettingsSuburbFormComponent } from './components/form/admin-settings-suburb-form.component';
import { AdminSettingsSuburbOverviewComponent } from './components/overview/admin-settings-suburb-overview.component';

const routes: Routes = [
  {
    path: '',
    component: AdminSettingsSuburbOverviewComponent,
  },
  {
    path: `form/:${id}`,
    component: AdminSettingsSuburbFormComponent,
  },
  {
    path: `form`,
    component: AdminSettingsSuburbFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSettingsSuburbRoutingModule { }
