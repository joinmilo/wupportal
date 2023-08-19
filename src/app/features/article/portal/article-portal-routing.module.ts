import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { articlesFeatureKey, slug } from 'src/app/core/constants/core.constants';

const routes: Routes = [
  {
    path: `${articlesFeatureKey}`,
    loadChildren: () => import('src/app/features/article/portal/overview/portal-article-overview.module')
      .then((imported) => imported.PortalArticleOverviewModule),
  },
  {
    path: `${articlesFeatureKey}/:${slug}`,
    loadChildren: () => import('src/app/features/article/portal/details/article-portal-details.module')
      .then((imported) => imported.ArticlePortalDetailsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlePortalRoutingModule { }
