import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { selectCurrentUser } from 'src/app/core/state/selectors/user.selectors';
import { PortalEventDetailsActions } from '../../state/portal-event-details.actions';
import { selectCalculatedEventRatings, selectEventUserRating } from '../../state/portal-event-details.selectors';

@Component({
  selector: 'app-portal-event-details-rating',
  templateUrl: './portal-event-details-rating.component.html',
  styleUrls: ['./portal-event-details-rating.component.scss']
})
export class PortalEventDetailsRatingComponent {

  public currentUserRating = this.store.select(selectEventUserRating)
    .pipe(map(rating => rating?.score));

  public calculatedRatings = this.store.select(selectCalculatedEventRatings);

  constructor(
    private router: Router,
    private store: Store) { }

  public saveRating(score: number): void {
    this.store.select(selectCurrentUser)
      .pipe(take(1))
      .subscribe(user => user?.id
        ? this.store.dispatch(PortalEventDetailsActions.saveEventRating({
            score,
          }))
        : this.router.navigate(['/user', 'login-required']))
  }
}