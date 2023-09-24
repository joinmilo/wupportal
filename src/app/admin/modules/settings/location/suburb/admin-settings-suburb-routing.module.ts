import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSettingsSuburbFormComponent } from './components/form/admin-settings-suburb-form.component';
import { AdminSettingsSuburbOverviewComponent } from './components/overview/admin-settings-suburb-overview.component';

const routes: Routes = [
  {
    path: '',
    component: AdminSettingsSuburbOverviewComponent,
  },
  {
    path: 'form',
    component: AdminSettingsSuburbFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSettingsSuburbRoutingModule { }
