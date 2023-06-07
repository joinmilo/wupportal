import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { collapse } from 'src/app/core/animations/animations';
import { DisplayType } from 'src/app/core/typings/overview-display';
import { FilterActions } from 'src/app/shared/filter/state/filter.actions';
import { selectFiltersActive } from 'src/app/shared/filter/state/filter.selectors';
import { RadioInput } from 'src/app/shared/form/typings/radio-input';
import { displayQueryParam } from '../../constants/portal-event-overview.constant';
import { PortalEventOverviewFilterService } from '../../services/portal-event-overview-filter.service';
import { PortalEventOverviewActions } from '../../state/portal-event-overview.actions';
import { selectSponsoredEvent } from '../../state/portal-event-overview.selectors';

@Component({
  selector: 'app-portal-event-filter-area',
  templateUrl: './portal-event-filter-area.component.html',
  styleUrls: ['./portal-event-filter-area.component.scss'],
  animations: [
     collapse()
  ],
})
export class PortalEventFilterAreaComponent implements OnDestroy {

  public sponsored = this.store.select(selectSponsoredEvent);

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

  public filtersActive = this.store.select(selectFiltersActive);
  public filtersCollapsed = true;

  public defaultDisplay = DisplayType.Category;
  public displayQueryParam = displayQueryParam;

  private destroy = new Subject<void>();
  
  constructor(
    private filterService: PortalEventOverviewFilterService,
    private store: Store,
  ) {
    this.store.dispatch(PortalEventOverviewActions.getSponsoredEvent());

    this.filterService.watchFilters()
      .pipe(takeUntil(this.destroy))
      .subscribe();
  }

  public displayChanged(value: DisplayType) {
    this.store.dispatch(PortalEventOverviewActions.displayChanged(value));
  }

  public clearFilters(): void {
    this.store.dispatch(FilterActions.clearAll());
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}