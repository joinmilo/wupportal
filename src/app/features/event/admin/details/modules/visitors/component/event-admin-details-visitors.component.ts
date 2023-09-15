import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { slug } from 'src/app/core/constants/queryparam.constants';
import { AnalyticsParams } from 'src/app/shared/widgets/analytics/typings/analytics';
import { EventAdminDetailsVisitorsActions } from '../state/event-admin-details-visitors.actions';
import { selectVisitorsStatistics } from '../state/event-admin-details-visitors.selectors';

@Component({
  selector: 'app-event-admin-details-visitors',
  templateUrl: './event-admin-details-visitors.component.html',
  styleUrls: ['./event-admin-details-visitors.component.scss']
})
export class EventAdminDetailsVisitorsComponent implements OnInit {
  
  public data = this.store.select(selectVisitorsStatistics);

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store) { }

  public ngOnInit(): void {
    this.activatedRoute.parent?.params.pipe(
      map(params => params[slug]),
      take(1)
    ).subscribe(slug => this.store.dispatch(EventAdminDetailsVisitorsActions.setSlug(slug)));
  }

  public updateParams(params: AnalyticsParams) {
    this.store.dispatch(EventAdminDetailsVisitorsActions.updateParams(params));
  }
}