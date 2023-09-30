import { Component, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Maybe } from 'src/app/core/api/generated/schema';
import { AppValidators } from 'src/app/core/validators/validators';
import { SchedulerActions } from '../../state/scheduler.actions';
import { selectColumns, selectLefthandColumns } from '../../state/scheduler.selectors';

@Component({
  selector: 'app-scheduler-datetime',
  templateUrl: './scheduler-datetime.component.html',
  styleUrls: ['./scheduler-datetime.component.scss'],
})
export class SchedulerDatetimeComponent implements OnDestroy {

  public assignedColumns = this.store.select(selectLefthandColumns)
  public columns = this.store.select(selectColumns);

  public minDate = new Date();
  public stepMinute = 15;

  public form = this.fb.group({
    startDate: [undefined as Maybe<Date>],
    endDate: [undefined as Maybe<Date>],
  }, {
    validators: [AppValidators.dateBefore('startDate', 'endDate')]
  });

  private destroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe(values =>
        this.store.dispatch(SchedulerActions.updatedInitSchedule(
          values.startDate,
          values.endDate,
          this.form.valid
        ))
      );
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
