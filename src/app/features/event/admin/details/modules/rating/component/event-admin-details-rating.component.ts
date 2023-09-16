import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { slug } from 'src/app/core/constants/queryparam.constants';
import { AnalyticsParams } from 'src/app/shared/widgets/analytics/typings/analytics';
import { EventAdminDetailsRatingActions } from '../state/event-admin-details-rating.actions';
import { selectRatingStatistics } from '../state/event-admin-details-rating.selectors';

@Component({
  selector: 'app-event-admin-details-rating',
  templateUrl: './event-admin-details-rating.component.html',
  styleUrls: ['./event-admin-details-rating.component.scss']
})
export class EventAdminDetailsRatingComponent implements OnInit {
  
  public data = this.store.select(selectRatingStatistics);

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store) { }

  public ngOnInit(): void {
    this.activatedRoute.parent?.params.pipe(
      map(params => params[slug]),
      take(1)
    ).subscribe(slug => this.store.dispatch(EventAdminDetailsRatingActions.setSlug(slug)));
  }

  public updateParams(params: AnalyticsParams) {
    this.store.dispatch(EventAdminDetailsRatingActions.updateParams(params));
  }
}