import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authorsFeatureKey } from 'src/app/core/constants/feature.constants';
import { slug } from 'src/app/core/constants/queryparam.constants';

const routes: Routes = [
  {
    path: authorsFeatureKey,
    loadChildren: () => import('src/app/features/author/portal/overview/portal-author-overview.module')
      .then((imported) => imported.PortalAuthorOverviewModule),
  },
  {
    path: `${authorsFeatureKey}/:${slug}`,
    loadChildren: () => import('src/app/features/author/portal/details/portal-author-details.module')
      .then((imported) => imported.PortalAuthorDetailsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorPortalRoutingModule { }
