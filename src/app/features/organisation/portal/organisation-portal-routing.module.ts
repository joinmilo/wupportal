import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { organisationsFeatureKey } from 'src/app/core/constants/feature.constants';
import { slug } from 'src/app/core/constants/queryparam.constants';

const routes: Routes = [
  {
    path: organisationsFeatureKey,
    loadChildren: () => import('src/app/features/organisation/portal/overview/portal-organisation-overview.module')
      .then((imported) => imported.PortalOrganisationOverviewModule),
  },
  {
    path: `${organisationsFeatureKey}/:${slug}`,
    loadChildren: () => import('src/app/features/organisation/portal/details/portal-organisation-details.module')
      .then((imported) => imported.PortalOrganisationDetailsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganisationPortalRoutingModule { }
