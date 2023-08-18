import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authorsFeatureKey, slug } from 'src/app/core/constants/core.constants';

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
