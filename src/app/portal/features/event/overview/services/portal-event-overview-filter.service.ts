import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatestWith, map, tap } from 'rxjs';
import { selectEventFilterParams } from 'src/app/shared/event-filter/state/event-filter.selectors';
import { selectTableParams } from 'src/app/shared/table/state/table.selectors';
import { PortalEventOverviewActions } from '../state/portal-event-overview.actions';

@Injectable()
export class PortalEventOverviewFilterService {

  constructor(
    private store: Store,
  ) { }

  public watchFilters(): Observable<unknown> {
    return this.store.select(selectEventFilterParams)
      .pipe(
        combineLatestWith(this.store.select(selectTableParams)),
        map(([p1, p2]) => Object.assign({ ...p1 } || {}, p2)),
        tap(params => this.store.dispatch(PortalEventOverviewActions.paramsUpdated(params)))
      );
  }

}
