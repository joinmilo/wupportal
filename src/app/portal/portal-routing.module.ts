import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalNotFoundComponent } from './common/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'events',
    loadChildren: () => import('./features/event/event.module')
      .then((imported) => imported.EventPortalModule),
  },
  {
    path: 'articles',
    loadChildren: () => import('./features/article/article.module')
      .then((imported) => imported.ArticlePortalModule),
  },
  {
    path: '404',
    component: PortalNotFoundComponent,
  },
  {
    path: '',
    loadChildren: () => import('./features/page/page.module')
      .then((imported) => imported.PagePortalModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
