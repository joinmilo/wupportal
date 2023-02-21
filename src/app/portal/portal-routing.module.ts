import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/page/page.module')
      .then((imported) => imported.PagePortalModule),
  },
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
