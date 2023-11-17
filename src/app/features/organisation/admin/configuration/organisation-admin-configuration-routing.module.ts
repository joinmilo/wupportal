import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganisationAdminConfigurationComponent } from './component/organisation-admin-configuration.component';

const routes: Routes = [
  {
    path: '',
    component: OrganisationAdminConfigurationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganisationAdminConfigurationRoutingModule { }
