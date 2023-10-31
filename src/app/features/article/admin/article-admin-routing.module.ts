import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { AdminActions } from 'src/app/admin/state/admin.actions';
import { AdminFeatureRoute } from 'src/app/admin/typings/menu';
import { articlesFeatureKey } from 'src/app/core/constants/feature.constants';
import { id, slug } from 'src/app/core/constants/queryparam.constants';
import { requireAnyPrivilege } from 'src/app/core/utils/privilege.utils';
import { ArticleAdminDetailsLayoutComponent } from './details/modules/layout/components/article-admin-details-layout.component';

const menuRoutes: AdminFeatureRoute[] = [
  // {
  //   path: `${articlesFeatureKey}/dashboard`,
  //   loadChildren: () => import('src/app/features/article/portal/details/article-portal-details.module')
  //     .then((imported) => imported.ArticlePortalDetailsModule),
  //   data: { label: 'dashboard' },
  // },
  {
    path: `${articlesFeatureKey}`,
    loadChildren: () => import('src/app/features/article/admin/overview/article-admin-overview.module')
      .then((imported) => imported.ArticleAdminOverviewModule),
    data: {
      label: 'overview',
      privileges: ['articles_admin', 'articles_manage'],
    },
    canActivate: [requireAnyPrivilege('articles_admin', 'articles_manage')]
  },
  {
    path: `${articlesFeatureKey}/category`,
    loadChildren: () => import('src/app/features/article/admin/category/article-admin-category.module')
      .then((imported) => imported.ArticleAdminCategoryModule),
    data: { 
      label: 'categories',
      privileges: ['articles_admin'],
    },
    canActivate: [requireAnyPrivilege('articles_admin')]
  },
];

const routes: Routes = [
  {
    path: `${articlesFeatureKey}/form`,
    loadChildren: () => import('src/app/features/article/admin/form/article-admin-form.module')
      .then((imported) => imported.ArticleAdminFormModule),
    canActivate: [requireAnyPrivilege('articles_admin', 'articles_manage')]
  },
  {
    path: `${articlesFeatureKey}/category/form`,
    loadChildren: () => import('src/app/features/article/admin/category-form/article-admin-category-form.module')
      .then((imported) => imported.ArticleAdminCategoryFormModule),
    canActivate: [requireAnyPrivilege('articles_admin')]
  },
  {
    path: `${articlesFeatureKey}/category/:${id}/form`,
    loadChildren: () => import('src/app/features/article/admin/category-form/article-admin-category-form.module')
      .then((imported) => imported.ArticleAdminCategoryFormModule),
    canActivate: [requireAnyPrivilege('articles_admin')]
  },
  {
    path: `${articlesFeatureKey}/:${slug}/form`,
    loadChildren: () => import('src/app/features/article/admin/form/article-admin-form.module')
      .then((imported) => imported.ArticleAdminFormModule),
    canActivate: [requireAnyPrivilege('articles_admin', 'articles_manage')]
  },
  {
    path: `${articlesFeatureKey}/:${slug}`,
    loadChildren: () => import('src/app/features/article/admin/details/article-admin-details.module')
      .then((imported) => imported.ArticleAdminDetailsModule),
    component: ArticleAdminDetailsLayoutComponent,
    canActivate: [requireAnyPrivilege('articles_admin', 'articles_manage')]
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
    this.store.dispatch(AdminActions.addMainRoutes({
      code: articlesFeatureKey,
      routes: menuRoutes,
    }));
  }
}
