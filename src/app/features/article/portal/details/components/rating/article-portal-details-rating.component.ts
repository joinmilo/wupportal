import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { ArticlePortalDetailsActions } from '../../state/article-portal-details.actions';
import { selectArticleUserRating, selectCalculatedArticleRatings } from '../../state/article-portal-details.selectors';

@Component({
  selector: 'app-article-portal-details-rating',
  templateUrl: './article-portal-details-rating.component.html',
  styleUrls: ['./article-portal-details-rating.component.scss']
})
export class ArticlePortalDetailsRatingComponent {

  public currentUserRating = this.store.select(selectArticleUserRating)
    .pipe(map(rating => rating?.score));

  public calculatedRatings = this.store.select(selectCalculatedArticleRatings);

  constructor(
    private store: Store) { }

  public saveRating(score: number): void {
    this.store.dispatch(ArticlePortalDetailsActions.saveArticleRating({
      score,
    }));
  }
}