import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, withLatestFrom } from 'rxjs';
import { AdminActions } from 'src/app/admin/state/admin.actions';
import { AnalyticsDto } from 'src/app/core/api/generated/schema';
import { GetEventDetailsVisitorGQL } from 'src/app/features/event/api/generated/get-event-details-visitors.query.generated';
import { EventAdminDetailsVisitorsActions } from './event-admin-details-visitors.actions';
import { selectParams, selectSlug } from './event-admin-details-visitors.selectors';

@Injectable()
export class EventAdminDetailsVisitorsEffects {

  retrieveStatistics = createEffect(() => this.actions.pipe(
    ofType(
      EventAdminDetailsVisitorsActions.setSlug,
      EventAdminDetailsVisitorsActions.updateParams,
    ),
    withLatestFrom(
      this.store.select(selectSlug),
      this.store.select(selectParams),
    ),
    filter(([, slug, params]) => !!slug && !!params),
    switchMap(([, slug, params]) => this.getVisitorStatisticsService.watch({
      entity: { slug },
      startDate: params?.period?.startDate,
      endDate: params?.period?.endDate,
      interval: params?.interval,
    }).valueChanges),
    map(response => response.data.getEvent?.id
      ? EventAdminDetailsVisitorsActions.setStatistics(response.data.getEvent.visitorStatistics as AnalyticsDto[])
      : AdminActions.notFound())
  ));

  constructor(
    private actions: Actions,
    private store: Store,
    private getVisitorStatisticsService: GetEventDetailsVisitorGQL,
  ) { }
}
