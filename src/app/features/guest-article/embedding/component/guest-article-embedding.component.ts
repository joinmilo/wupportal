import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { GuestArticleEmbeddingActions } from '../state/guest-article-embedding.actions';
import { selectRecentGuestArticles } from '../state/guest-article-page-feature.selectors';

@Component({
  selector: 'app-guest-article-embedding',
  templateUrl: './guest-article-embedding.component.html',
  styleUrls: ['./guest-article-embedding.component.scss']
})
export class GuestArticleEmbeddingComponent {
  
  public guestArticles = this.store.select(selectRecentGuestArticles);

  constructor(
    private store: Store, 
  ) {
    this.store.dispatch(GuestArticleEmbeddingActions.getRecentGuestArticles());
  }

}
