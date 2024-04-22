import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FilterService } from 'ngx-cinlib/filters';
import { Subject, takeUntil } from 'rxjs';
import { Maybe } from 'src/app/core/api/generated/schema';
import { ContestFilterQueryDefinition } from 'src/app/core/typings/filter-params/contest-filter-param';
import { ContestFilterActions } from '../../state/contest-filter.actions';
import { selectTypes } from '../../state/contest-filter.selector';

@Component({
  selector: 'app-contest-filter-types',
  templateUrl: './contest-filter-types.component.html',
  styleUrls: ['./contest-filter-types.component.scss']
})
export class ContestFilterTypesComponent implements OnInit, OnDestroy {

  @Input()
  public queryParamKey = ContestFilterQueryDefinition.contestTypes;

  @Output()
  public valueChanged = new EventEmitter<Maybe<string[]> | undefined>();

  public control = new FormControl();

  private destroy = new Subject<void>();

  public types = this.store.select(selectTypes);

  constructor(
    private filterService: FilterService,
    private store: Store,
  ) {
    this.store.dispatch(ContestFilterActions.getTypes());
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
