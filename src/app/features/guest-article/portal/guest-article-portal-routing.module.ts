import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { guestArticlesFeatureKey } from 'src/app/core/constants/core.constants';

const routes: Routes = [
  {
    path: guestArticlesFeatureKey,
    loadChildren: () => import('src/app/features/guest-article/portal/main/portal-guest-article.module')
        .then((imported) => imported.PortalGuestArticleModule),
  },
  // {
  //   path: mapFeatureKey,
  //   loadChildren: () => import('src/app/features/map/portal/overview/portal-map-overview.module')
  //     .then((imported) => imported.PortalMapOverviewModule),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestArticlePortalRoutingModule { }
