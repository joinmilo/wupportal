import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, take, takeUntil } from 'rxjs';
import { Period } from 'src/app/core/typings/period';
import { Maybe } from 'src/schema/schema';
import { EventFilterQueryDefinition } from '../../../../../core/typings/filter-param';
import { EventFilterActions } from '../../state/event-filter.actions';

@Component({
  selector: 'app-event-filter-date',
  templateUrl: './event-filter-date.component.html',
  styleUrls: ['./event-filter-date.component.scss']
})
export class EventFilterDateComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  public disabled?: Maybe<boolean>;

  @Input()
  public queryParamStartKey = EventFilterQueryDefinition.startDate;

  @Input()
  public queryParamEndKey = EventFilterQueryDefinition.endDate;

  @Output()
  public valueChanged = new EventEmitter<Period>();

  public form = this.fb.group({
    startDate: [undefined as Maybe<Date> | undefined],
    endDate: [undefined as Maybe<Date> | undefined],
  });

  // This is necessary due to the MatDateRange bug:
  // https://github.com/angular/components/issues/20218
  private emitEvent = true;

  private destroy = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
  ) {
    this.watchValueChange();
  }

  public ngOnInit(): void {
    (this.queryParamStartKey || this.queryParamEndKey) && this.activatedRoute.queryParams
      .pipe(take(1))
      .subscribe(params => {
        this.form.setValue({
          startDate: new Date(params[this.queryParamStartKey] ?? ''),
          endDate: new Date(params[this.queryParamEndKey] ?? '')
        });
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      if (this.disabled) {
        this.emitEvent = false;
        this.form.controls.startDate.disable();
        this.form.controls.endDate.disable();
        if (this.queryParamStartKey || this.queryParamEndKey) {
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {
              [this.queryParamStartKey]: null,
              [this.queryParamEndKey]: null,
            },
            queryParamsHandling: 'merge',
          });
        }
      } else {
        this.form.controls.startDate.enable();
        this.form.controls.endDate.enable();
      }
    }
  }

  private watchValueChange(): void {
    this.form.controls.endDate.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe(endDate => {
        if (!isNaN(this.form.value?.startDate?.valueOf() || NaN)
          && !isNaN(endDate?.valueOf() || NaN)
          && this.emitEvent) {
          endDate?.setHours(23, 59, 59, 999);
          this.form.value.startDate?.setHours(0, 0 , 0, 0);
          
          if (this.queryParamStartKey || this.queryParamEndKey) {
            this.router.navigate([], {
              relativeTo: this.activatedRoute,
              queryParams: {
                [this.queryParamStartKey]: this.form.value.startDate?.toISOString(),
                [this.queryParamEndKey]: endDate?.toISOString(),
              },
              queryParamsHandling: 'merge',
            });
          }

          const period = {
            startDate: this.form.value.startDate,
            endDate,
          } as Period;
  
          this.valueChanged.emit(period);
          this.store.dispatch(EventFilterActions.selectedPeriod(period));
        }
        this.emitEvent = true;
      });
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
  
}
