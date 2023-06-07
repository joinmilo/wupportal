import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Subject } from 'rxjs';
import { collapse } from 'src/app/core/animations/animations';
import { EventFilterActions } from 'src/app/shared/event-filter/state/event-filter.actions';
import { selectFiltersActive } from 'src/app/shared/event-filter/state/event-filter.selectors';

@Component({
  selector: 'app-event-filter-group',
  templateUrl: './event-filter-group.component.html',
  styleUrls: ['./event-filter-group.component.scss'],
  animations: [
     collapse()
  ],
})
export class EventFilterGroupComponent implements OnDestroy {

  @Output()
  public paramsUpdated = new EventEmitter<Maybe<string[]> | undefined>();

  public filtersActive = this.store.select(selectFiltersActive);

  public filtersCollapsed = true;

  private destroy = new Subject<void>();
  
  constructor(
    // private filterService: EventFilterService,
    private store: Store,
  ) {
    this.store.dispatch(EventFilterActions.init());

    // this.filterService.watchFilters()
    //   .pipe(takeUntil(this.destroy))
    //   .subscribe();
  }

  public clearFilters(): void {
    this.store.dispatch(EventFilterActions.clearAll());
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}