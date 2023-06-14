import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { EventFilterQueryParams } from 'src/app/core/typings/filter-query-param';
import { DisplayType } from 'src/app/core/typings/overview-display';
import { RadioInput } from 'src/app/shared/form/typings/radio-input';
import { FilterSortPaginateInput } from 'src/schema/schema';
import { displayQueryParam } from '../constants/portal-event-overview.constants';
import { PortalEventOverviewActions } from '../state/portal-event-overview.actions';
import { selectOverviewData, selectSponsoredEvent } from '../state/portal-event-overview.selectors';

@Component({
  selector: 'app-portal-event-overview',
  templateUrl: './portal-event-overview.component.html',
  styleUrls: ['./portal-event-overview.component.scss']
})
export class PortalEventOverviewComponent {

  public displayType = DisplayType.Category;

  public displayQueryParam = displayQueryParam;

  public inputs: RadioInput[] = [
    {
      icon: ['fas', 'shapes'],
      label: 'category',
      value: DisplayType.Category
    },
    {
      icon: ['fas', 'calendar'],
      label: 'calendar',
      value: DisplayType.Calendar
    },
    {
      icon: ['fas', 'map-location-dot'],
      label: 'mapview',
      value: DisplayType.Map
    },
    {
      icon: ['fas', 'list'],
      label: 'list',
      value: DisplayType.List
    },
  ];

  public events = this.store.select(selectOverviewData);

  public sponsored = this.store.select(selectSponsoredEvent);
  
  constructor(
    private store: Store,
  ) {
    this.store.dispatch(PortalEventOverviewActions.getSponsoredEvent());
  }

  public updateParams(params: FilterSortPaginateInput) {
    this.store.dispatch(PortalEventOverviewActions.updateParams(params));
  }

  public updateRawParams(params: EventFilterQueryParams) {
    this.store.dispatch(PortalEventOverviewActions.updateRawParams(params));
  }

}