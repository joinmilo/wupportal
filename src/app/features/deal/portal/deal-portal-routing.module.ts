import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dealsFeatureKey, slug } from 'src/app/core/constants/core.constants';

const routes: Routes = [
  {
    path: dealsFeatureKey,
    loadChildren: () => import('src/app/features/deal/portal/overview/portal-deal-overview.module')
      .then((imported) => imported.PortalDealOverviewModule),
  },
  {
    path: `${dealsFeatureKey}/:${slug}`,
    loadChildren: () => import('src/app/features/deal/portal/details/portal-deal-details.module')
      .then((imported) => imported.PortalDealDetailsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealPortalRoutingModule { }
