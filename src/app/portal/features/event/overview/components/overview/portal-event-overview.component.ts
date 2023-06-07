import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { DisplayType } from 'src/app/core/typings/overview-display';
import { RadioInput } from 'src/app/shared/form/typings/radio-input';
import { displayQueryParam } from '../../constants/portal-event-overview.constant';
import { PortalEventOverviewFilterService } from '../../services/portal-event-overview-filter.service';
import { PortalEventOverviewActions } from '../../state/portal-event-overview.actions';
import { selectSponsoredEvent } from '../../state/portal-event-overview.selectors';

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

  public sponsored = this.store.select(selectSponsoredEvent);
  
  constructor(
    private store: Store,
    private filterService: PortalEventOverviewFilterService,
  ) {
    this.store.dispatch(PortalEventOverviewActions.getSponsoredEvent());

    this.filterService.watchFilters().subscribe();
  }

}