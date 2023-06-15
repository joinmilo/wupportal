import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalOrganisationOverviewComponent } from './components/portal-organisation-overview.component';

const routes: Routes = [
  {
    path: '',
    component: PortalOrganisationOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalOrganisationOverviewRoutingModule { }
