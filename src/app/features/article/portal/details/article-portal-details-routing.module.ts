import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlePortalDetailsComponent } from './components/article-portal-details.component';
import { ArticlePortalDetailsCommentsComponent } from './components/comments/article-portal-details-comments.component';
import { ArticlePortalDetailsMediaComponent } from './components/media/article-portal-details-media.component';

const routes: Routes = [
  {
    path: '',
    component: ArticlePortalDetailsComponent
  },
  {
    path: 'comments',
    component: ArticlePortalDetailsCommentsComponent
  }, 
  {
    path: 'media',
    component: ArticlePortalDetailsMediaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlePortalDetailsRoutingModule { }
