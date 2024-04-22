import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FilterService } from 'ngx-cinlib/filters';
import { Subject, takeUntil } from 'rxjs';
import { Maybe } from 'src/app/core/api/generated/schema';
import { EventFilterQueryDefinition } from 'src/app/core/typings/filter-params/event-filter-param';
import { EventFilterActions } from '../../state/event-filter.actions';
import { selectTargetGroups } from '../../state/event-filter.selectors';

@Component({
  selector: 'app-event-filter-targetgroup',
  templateUrl: './event-filter-targetgroup.component.html',
  styleUrls: ['./event-filter-targetgroup.component.scss']
})
export class EventFilterTargetgroupComponent implements OnInit, OnDestroy {

  @Input()
  public queryParamKey = EventFilterQueryDefinition.targetGroups;

  @Output()
  public valueChanged = new EventEmitter<Maybe<string[]> | undefined>();

  public control = new FormControl();

  private destroy = new Subject<void>();

  public targetGroups = this.store.select(selectTargetGroups);

  constructor(
    private filterService: FilterService,
    private router: Router,
    private store: Store,
  ) {
    this.store.dispatch(EventFilterActions.getTargetGroups());
    this.watchValueChange();
  }

  public ngOnInit(): void {
    this.filterService.queryParams()
      .pipe(takeUntil(this.destroy))
      .subscribe(params => {
        const value = typeof params?.[this.queryParamKey] === 'string'
          ? [params[this.queryParamKey]]
          : params?.[this.queryParamKey];

        this.control.setValue(value, {
          emitEvent: false,
        });
      });
  }

  private watchValueChange(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe((ids: Maybe<string[]>) => {
        this.valueChanged.emit(ids);
        this.filterService.updateParam(this.queryParamKey, ids);
      });
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
  
}
