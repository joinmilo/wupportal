import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { mediaFeatureKey } from 'src/app/core/constants/feature.constants';

const routes: Routes = [
  {
    path: mediaFeatureKey,
    loadChildren: () => import('src/app/features/media/portal/overview/portal-media-overview.module')
      .then((imported) => imported.PortalMediaOverviewModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaPortalRoutingModule { }
