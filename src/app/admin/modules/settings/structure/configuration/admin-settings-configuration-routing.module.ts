import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSettingsConfigurationComponent } from './component/admin-settings-configuration.component';

const routes: Routes = [
  {
    path: '',
    component: AdminSettingsConfigurationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSettingsConfigurationRoutingModule { }
