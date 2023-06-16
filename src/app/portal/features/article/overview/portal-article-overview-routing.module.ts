import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalArticleOverviewComponent } from './components/portal-article-overview.component';

const routes: Routes = [
  {
    path: '',
    component: PortalArticleOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalArticleOverviewRoutingModule { }
