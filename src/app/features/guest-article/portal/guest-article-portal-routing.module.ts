import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { guestArticlesFeatureKey } from 'src/app/core/constants/feature.constants';

const routes: Routes = [
  {
    path: guestArticlesFeatureKey,
    loadChildren: () => import('src/app/features/guest-article/portal/main/portal-guest-article.module')
        .then((imported) => imported.PortalGuestArticleModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestArticlePortalRoutingModule { }
