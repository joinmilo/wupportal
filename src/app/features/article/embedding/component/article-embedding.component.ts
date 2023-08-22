import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ArticleEmbeddngActions } from '../state/article-embedding.actions';
import { selectRecentArticles } from '../state/article-embedding.selectors';

@Component({
  selector: 'app-article-embedding',
  templateUrl: './article-embedding.component.html',
  styleUrls: ['./article-embedding.component.scss']
})
export class ArticleEmbeddingComponent {
  
  public articles = this.store.select(selectRecentArticles);

  constructor(
    private store: Store, 
  ) {
    this.store.dispatch(ArticleEmbeddngActions.getRecentArticles());
  }

}
