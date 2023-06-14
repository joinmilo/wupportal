import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, debounceTime, take, takeUntil } from 'rxjs';
import { collapse } from 'src/app/core/animations/animations';
import { EventFilterActions } from 'src/app/shared/event-filter/state/event-filter.actions';
import { selectEventFilterParams, selectFiltersActive, selectRawFilterParams } from 'src/app/shared/event-filter/state/event-filter.selectors';
import { FilterSortPaginateInput } from 'src/schema/schema';
import { EventFilterQueryParams } from '../../../core/typings/filter-query-param';

@Component({
  selector: 'app-event-filter',
  templateUrl: './event-filter.component.html',
  styleUrls: ['./event-filter.component.scss'],
  animations: [
     collapse()
  ],
})
export class EventFilterComponent implements OnInit, OnDestroy {

  @Output()
  public paramsUpdated = new EventEmitter<FilterSortPaginateInput>();

  @Output()
  public rawParamsUpdated = new EventEmitter<EventFilterQueryParams>();

  public disbleDateFilter = false;
  
  public filtersActive = this.store.select(selectFiltersActive);

  public filtersCollapsed = true;

  private destroy = new Subject<void>();
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
  ) {
    this.updateWithQueryParams();
  }
  
  public ngOnInit(): void {
    this.store.select(selectEventFilterParams)
      .pipe(takeUntil(this.destroy))
      .subscribe(params => this.paramsUpdated.emit(params));

    this.store.select(selectRawFilterParams)
      .pipe(takeUntil(this.destroy))
      .subscribe(params => {
        this.disbleDateFilter = !!params?.past;
        this.rawParamsUpdated.emit(params);
      });
  }

  @HostListener('window:popstate', ['$event'])
  public onBrowserNavigation() {
    this.updateWithQueryParams();
  }

  private updateWithQueryParams() {
    this.activatedRoute.queryParams
      .pipe(
        debounceTime(0), //TODO: race condition between browser navigation and queryparams
        take(1)
    ).subscribe(params => this.store.dispatch(EventFilterActions.updateAll(params)));
  }

  public clearFilters(): void {
    this.store.dispatch(EventFilterActions.clearAll());
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}