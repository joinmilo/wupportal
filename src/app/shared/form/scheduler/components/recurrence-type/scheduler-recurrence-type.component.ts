import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Maybe } from 'src/app/core/api/generated/schema';
import { SchedulerActions } from '../../state/scheduler.actions';
import { selectColumns, selectInitSchedule, selectLefthandColumns, selectResult } from '../../state/scheduler.selectors';
import { Recurrence, } from '../../typings/scheduler';

@Component({
  selector: 'app-scheduler-recurrence-type',
  templateUrl: './scheduler-recurrence-type.component.html',
  styleUrls: ['./scheduler-recurrence-type.component.scss'],
})
export class SchedulerRecurrenceTypeComponent implements OnDestroy {

  public columns = this.store.select(selectColumns);
  public leftAssignedColumns = this.store.select(selectLefthandColumns);

  public results = this.store.select(selectResult);

  public control = new FormControl<Maybe<Recurrence>>('noRecurrence');

  public recurrences: Recurrence[] = [
    'noRecurrence',
    'daily',
    'weekly',
    'monthly',
    'yearly',
  ];

  private destroy = new Subject<void>();

  constructor(
    private store: Store,
  ) {
    this.setDisableState();
    this.emit();
  }
  
  private setDisableState(): void {
    this.store.select(selectInitSchedule)
      .pipe(takeUntil(this.destroy))
      .subscribe(initSchedule => {
        initSchedule
          ? this.control.enable()
          : this.control.disable();

        this.control.patchValue('noRecurrence');
        this.store.dispatch(SchedulerActions.updatedRecurrenceType('noRecurrence'));
      }
      );
  }

  private emit(): void {
    this.control.valueChanges
    .pipe(takeUntil(this.destroy))
    .subscribe(value => {
      if (this.control.valid && value) {
        this.store.dispatch(SchedulerActions.updatedRecurrenceType(value));
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
