import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FilterService } from 'ngx-cinlib/filters';
import { Subject, takeUntil } from 'rxjs';
import { Maybe } from 'src/app/core/api/generated/schema';
import { FilterQueryDefinition } from 'src/app/core/typings/filter-params/filter-param';
import { SuburbFilterActions } from '../state/suburb-filter.actions';
import { selectSuburbs } from '../state/suburb-filter.selectors';

@Component({
  selector: 'app-suburb-filter',
  templateUrl: './suburb-filter.component.html',
  styleUrls: ['./suburb-filter.component.scss']
})
export class SuburbFilterComponent implements OnInit, OnDestroy {

  @Input()
  public queryParamKey = FilterQueryDefinition.suburbs;

  @Output()
  public valueChanged = new EventEmitter<Maybe<string[]> | undefined>();

  public control = new FormControl();

  private destroy = new Subject<void>();

  public suburbs = this.store.select(selectSuburbs);

  constructor(
    private filterService: FilterService,
    private store: Store,
  ) {
    this.store.dispatch(SuburbFilterActions.getSuburbs());
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
        this.filterService.updateParam(this.queryParamKey, ids)
        this.valueChanged.emit(ids);
      });
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
