import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'events',
    loadChildren: () => import('./features/events/events.module')
      .then((imported) => imported.EventsModule),
  },
  {
    path: 'articles',
    loadChildren: () => import('./features/articles/articles.module')
      .then((imported) => imported.ArticlesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
