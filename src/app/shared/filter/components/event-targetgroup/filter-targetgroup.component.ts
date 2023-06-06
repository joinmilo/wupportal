import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject, take, takeUntil, tap } from 'rxjs';
import { Maybe } from 'src/schema/schema';
import { FilterQueryParams } from '../../constants/filter.constants';
import { FilterActions } from '../../state/filter.actions';
import { selectTargetGroups } from '../../state/filter.selectors';

@Component({
  selector: 'app-filter-targetgroup',
  templateUrl: './filter-targetgroup.component.html',
  styleUrls: ['./filter-targetgroup.component.scss']
})
export class FilterTargetgroupComponent implements OnInit, OnDestroy {

  @Input()
  public queryParamKey = FilterQueryParams.targetGroups;

  @Output()
  public valueChanged = new EventEmitter<Maybe<string[]> | undefined>();

  public control = new FormControl();

  private destroy = new Subject<void>();

  public targetGroups = this.store.select(selectTargetGroups).pipe(
    tap(targetGroups => !targetGroups?.length
      && this.store.dispatch(FilterActions.getTargetGroups()))
  );

  constructor(
    private actions: Actions,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store,
  ) {

    //TODO: This seems hacky to subscribe to actions within a component
    this.actions.pipe(
      ofType(FilterActions.clearAll),
      takeUntil(this.destroy)
    ).subscribe(() => {
      this.control.patchValue(undefined);

      if (this.queryParamKey) {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {
            [this.queryParamKey || '']: undefined
          },
          queryParamsHandling: 'merge',
        });
      }
    });
  }

  public ngOnInit(): void {
    this.queryParamKey && this.activatedRoute.queryParams
      .pipe(take(1))
      .subscribe(params => {
        if (this.queryParamKey) {
          const value = typeof params[this.queryParamKey] === 'string'
            ? [params[this.queryParamKey]]
            : params[this.queryParamKey];
          this.control.patchValue(value);
          this.valueChanged.emit(value);
          this.store.dispatch(FilterActions.selectTargetGroups(value));
        }
      });
  }

  public changeSelect(targetGroupIds: Maybe<string[]>): void {
    if (this.queryParamKey) {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          [this.queryParamKey || '']: targetGroupIds
        },
        queryParamsHandling: 'merge',
      });
    }

    this.valueChanged.emit(targetGroupIds);
    this.store.dispatch(FilterActions.selectTargetGroups(targetGroupIds));
  }

  public ngOnDestroy(): void {
    this.store.dispatch(FilterActions.selectTargetGroups(undefined));

    this.destroy.next();
    this.destroy.complete();
  }
  
}
