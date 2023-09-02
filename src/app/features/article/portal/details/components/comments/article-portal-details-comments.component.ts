import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { slug } from 'src/app/core/constants/queryparam.constants';
import { ArticlePortalDetailsActions } from '../../state/article-portal-details.actions';
import { selectArticleComments } from '../../state/article-portal-details.selectors';

@Component({
  selector: 'app-article-portal-details-comments',
  templateUrl: './article-portal-details-comments.component.html',
  styleUrls: ['./article-portal-details-comments.component.scss']
})
export class ArticlePortalDetailsCommentsComponent implements OnInit, OnDestroy {
  
  public comments = this.store.select(selectArticleComments);

  private destroy = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
  ) { }
    
  public ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.destroy))
      .subscribe(params => this.store.dispatch(
        ArticlePortalDetailsActions.getComments(params.get(slug) || ''))
      );
  }

  public saveComment(content: string): void {
    this.store.dispatch(ArticlePortalDetailsActions.saveArticleComment({
      content,
    }));
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}