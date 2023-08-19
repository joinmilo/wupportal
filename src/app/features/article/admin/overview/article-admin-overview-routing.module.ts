import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleAdminOverviewComponent } from './component/article-admin-overview.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleAdminOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleAdminOverviewRoutingModule { }
