import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { ArticlePortalDetailsActions } from '../../state/article-portal-details.actions';
import { selectArticleDetails } from '../../state/article-portal-details.selectors';

@Component({
  selector: 'app-article-portal-details-comment',
  templateUrl: './article-portal-details-comment.component.html',
  styleUrls: ['./article-portal-details-comment.component.scss']
})
export class ArticlePortalDetailsCommentComponent {

  public lastComment = this.store.select(selectArticleDetails)
    .pipe(map(article => article?.lastArticleComment));

  constructor(
    private store: Store) { }

  public saveComment(content: string): void {
    this.store.dispatch(ArticlePortalDetailsActions.saveArticleComment({
      content,
    }));
  }
}