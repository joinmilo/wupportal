import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleAdminFormComponent } from './components/article-admin-form.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleAdminFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleAdminFormRoutingModule { }
