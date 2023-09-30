import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { SchedulerActions } from '../../state/scheduler.actions';
import { selectColumns, selectLefthandColumns, selectNumberColumns, selectRecurrenceType } from '../../state/scheduler.selectors';

@Component({
  selector: 'app-scheduler-recurrence-interval',
  templateUrl: './scheduler-recurrence-interval.component.html',
  styleUrls: ['./scheduler-recurrence-interval.component.scss'],
})
export class SchedulerRecurrenceIntervalComponent implements OnDestroy {

  public columns = this.store.select(selectColumns);
  public leftAssignedColumns = this.store.select(selectLefthandColumns);
  public numberAssignedColumns = this.store.select(selectNumberColumns);

  public control = new FormControl<number>(1, Validators.min(1));

  private destroy = new Subject<void>();

  constructor(
    private store: Store,
  ) {
    this.control.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe(interval => this.store.dispatch(
        SchedulerActions.updatedInterval(interval, this.control.valid)));
  }

  public get everyRecurrenceLabel(): Observable <string> {
    const isSingle = Number(this.control.value) === 1;

    return this.store.select(selectRecurrenceType)
      .pipe(
        map(recurrenceType => {
          switch(recurrenceType) {
            case 'daily':
              return isSingle
                ? 'day'
                : 'days';
            case 'weekly':
              return isSingle
                ? 'week'
                : 'weeks';
            case 'monthly':
              return isSingle
                ? 'month'
                : 'months';
            case 'yearly':
              return isSingle
                ? 'year'
                : 'years';
            default:
              return '';
          }
        }),
      );
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
