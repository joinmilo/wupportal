import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, withLatestFrom } from 'rxjs';
import {
  DealEntity,
  EventEntity,
  OrganisationEntity
} from 'src/app/core/api/generated/schema';
import { MapEntityFilter } from 'src/app/core/typings/filter-params/map-filter-param';
import { GetDealCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-deal-cards.query.generated';
import { GetEventCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-event-cards.query.generated';
import { GetOrganisationCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-organisation-cards.query.generated';
import { MapFeatureActions } from './portal-map-overview.actions';
import { selectActiveEntityFilter } from './portal-map-overview.selector';

@Injectable()
export class PortalMapOverviewEffects {

  getEvents = createEffect(() => this.actions.pipe(
    ofType(MapFeatureActions.setFilterParams),
    withLatestFrom(this.store.select(selectActiveEntityFilter)),
    filter(([, activePoi]) => !activePoi || activePoi === MapEntityFilter.Events),
    switchMap(([action]) => this.getEventCardsService.watch({params: action.params}).valueChanges),
    map((response) => MapFeatureActions.setEvents({
      events: response.data.getEvents?.result as EventEntity[]
    }))
  ));

  getOrganisations = createEffect(() => this.actions.pipe(
    ofType(MapFeatureActions.setFilterParams),
    withLatestFrom(this.store.select(selectActiveEntityFilter)),
    filter(([, activePoi]) => !activePoi || activePoi === MapEntityFilter.Organisations),
    switchMap(([action]) => this.getOrganisationCardsService.watch({params: action.params}).valueChanges),
    map((response) => MapFeatureActions.setOrganisations({
      organisations: response.data.getOrganisations?.result as OrganisationEntity[]
    }))
  ));

  getDeals = createEffect(() => this.actions.pipe(
    ofType(MapFeatureActions.setFilterParams),
    withLatestFrom(this.store.select(selectActiveEntityFilter)),
    filter(([, activePoi]) => !activePoi || activePoi === MapEntityFilter.Deals),
    switchMap(([action]) => this.getDealCardsService.watch({params: action.params}).valueChanges),
    map((response) => MapFeatureActions.setDeals({
      deals: response.data.getDeals?.result as DealEntity[]
    }))
  ));

  constructor(
    private actions: Actions,
    private getDealCardsService: GetDealCardsGQL,
    private getEventCardsService: GetEventCardsGQL,
    private getOrganisationCardsService: GetOrganisationCardsGQL,
    private store: Store
  ) {}
}

