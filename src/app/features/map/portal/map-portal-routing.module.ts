import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { mapFeatureKey } from 'src/app/core/constants/core.constants';

const routes: Routes = [
  {
    path: mapFeatureKey,
    loadChildren: () => import('src/app/features/map/portal/overview/portal-map-overview.module')
      .then((imported) => imported.PortalMapOverviewModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapPortalRoutingModule { }
