import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { AdminActions } from 'src/app/admin/state/admin.actions';
import { articlesFeatureKey, slug } from 'src/app/core/constants/core.constants';

const menuRoutes: Routes = [
  {
    path: `${articlesFeatureKey}`,
    loadChildren: () => import('src/app/features/article/portal/overview/portal-article-overview.module')
      .then((imported) => imported.PortalArticleOverviewModule),
    data: { label: 'overview' },
  },
  {
    path: `${articlesFeatureKey}/dashboard`,
    loadChildren: () => import('src/app/features/article/portal/details/portal-article-details.module')
      .then((imported) => imported.PortalArticleDetailsModule),
    data: { label: 'dashboard' },
  },
];

const routes: Routes = [
  {
    path: `${articlesFeatureKey}/${slug}`,
    loadChildren: () => import('src/app/features/article/portal/details/portal-article-details.module')
      .then((imported) => imported.PortalArticleDetailsModule),
  },
]

@NgModule({
  imports: [RouterModule.forChild([
    ...menuRoutes,
    ...routes,
  ])],
  exports: [RouterModule]
})
export class ArticleAdminRoutingModule {

  constructor(
    public store: Store
  ) {
    this.store.dispatch(AdminActions.addRoutes({
      key: articlesFeatureKey,
      routes: menuRoutes,
    }));
  }
}
