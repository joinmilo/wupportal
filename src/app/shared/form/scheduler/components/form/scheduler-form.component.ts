import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Period } from 'src/app/core/typings/period';
import { SchedulerActions } from '../../state/scheduler.actions';
import { selectRecurrenceType } from '../../state/scheduler.selectors';

@Component({
  selector: 'app-scheduler-form',
  templateUrl: './scheduler-form.component.html',
  styleUrls: ['./scheduler-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SchedulerFormComponent),
      multi: true
    }
  ],
})
export class SchedulerFormComponent implements ControlValueAccessor {

  @Input()
  public set initStartDate(initStartDate: Date) {
    this.store.dispatch(SchedulerActions.setInitStartDate(initStartDate));
  }

  @Input()
  public set initEndDate(initEndDate: Date) {
    this.store.dispatch(SchedulerActions.setInitEndDate(initEndDate));
  }

  public recurrenceType = this.store.select(selectRecurrenceType);

  public onChange?: (value: Period[]) => void;
  public onTouched?: () => void;

  private destroy = new Subject<void>();

  constructor(
    private store: Store,
  ) {
    this.touched();
    // this.datesChanged();
    // this.recurrenceEndChanged();
  }
  
  private touched() {
    // this.form.valueChanges
    //   .pipe(takeUntil(this.destroy))
    //   .subscribe(() => this.onTouched && this.onTouched());
  }

  // private datesChanged(): void {
  //   combineLatest([
  //     this.form.controls.startDate.valueChanges,
  //     this.form.controls.endDate.valueChanges
  //   ])
  //     .pipe(takeUntil(this.destroy))
  //     .subscribe(([startDate, endDate]) => {
  //       if (startDate && endDate) {
  //         this.result.push({
  //           startDate: new Date(startDate),
  //           endDate: new Date(endDate)
  //         });
  //         this.onChange && this.onChange(this.result);
  //         this.form.controls.recurrence.enable();
  //       } else {
  //         this.form.controls.recurrence.disable()
  //       }
  //     });
  // }

  // public showSchedules(): void {
  //   this.store.dispatch(CoreActions.setAsideComponent({
  //     component: SchedulerOverviewComponent,
  //     params: {
  //       schedules: this.result
  //     }
  //   }))
  // }

  // public generate(): void {    
  //   const result = this.schedulerService.calculateSchedules(
  //     this.createInitalSchedules(),
  //     this.createRecurrenceOptions()
  //   );

  //   this.emit(result);
  // }

  // private createInitalSchedules(): Maybe<Period> {
  //   return this.form.value.startDate && this.form.value.endDate
  //     ? {
  //         startDate: new Date(this.form.value.startDate),
  //         endDate: new Date(this.form.value.endDate),
  //       }
  //     : null;
  // }

  // private createRecurrenceOptions(): RecurrenceOptions {
  //   return {
  //     interval: (this.form.value.recurrenceInterval ?? 1),
  //     recurrence: (this.form.value.recurrence ?? 'daily'),
  //     // repeatTimes: this.form.value.recurrenceEnd === 'after'
  //     //   ? Number(this.form.value.recurrenceAfterTimes)
  //     //   : null,
  //     // untilDate: this.form.value.recurrenceEnd === 'on'
  //     //   ? new Date(this.form.value.recurrenceUntil ?? '')
  //     //   : null
  //   };
  // }

  // emit(result: Period[]) {
  //   this.result = this.result
  //     ? [...this.result, ...result]
  //     : result;

  //   this.onChange && this.onChange(this.result);

  //   this.store.dispatch(CoreActions.setFeedback({
  //     type: FeedbackType.Success,
  //     labelMessage: 'successfullyGeneratedSchedules',
  //     labelAction: 'createNewSchedules'
  //   }));

  //   this.form.reset();
  // }

  public writeValue(value: Period[]): void {
    this.store.dispatch(SchedulerActions.setResult(value));
  }

  public registerOnChange(onChange: (value: Period[]) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

}
