import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatestWith, map, tap } from 'rxjs';
import { EventFilterActions } from 'src/app/shared/event-filter/state/event-filter.actions';
import { selectFilterParams } from 'src/app/shared/event-filter/state/event-filter.selectors';
import { selectTableParams } from 'src/app/shared/table/state/table.selectors';
import { PortalEventOverviewActions } from '../../../portal/features/event/overview/state/portal-event-overview.actions';

@Injectable()
export class EventFilterService {

  constructor(
    private store: Store,
  ) {
    this.store.dispatch(EventFilterActions.init());
  }

  public watchFilters(): Observable<unknown> {
    return this.store.select(selectFilterParams)
      .pipe(
        combineLatestWith(this.store.select(selectTableParams)),
        map(([p1, p2]) => Object.assign({ ...p1 } || {}, p2)),
        tap(params => this.store.dispatch(PortalEventOverviewActions.paramsUpdated(params)))
      );
  }

}
