import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, combineLatest, takeUntil } from 'rxjs';
import { Maybe } from 'src/app/core/api/generated/schema';
import { CoreActions } from 'src/app/core/state/actions/core.actions';
import { FeedbackType } from 'src/app/core/typings/feedback';
import { Period } from 'src/app/core/typings/period';
import { toLocalDateTime } from 'src/app/core/utils/date.utils';
import { AppValidators } from 'src/app/core/validators/validators';
import { RadioButtonInput } from '../../../radio-button/typings/radio-button-input';
import { SchedulerService } from '../../services/scheduler.service';
import { Recurrence, RecurrenceEnd, RecurrenceOptions } from '../../typings/scheduler';

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

export class SchedulerFormComponent implements OnInit, ControlValueAccessor {

  @Input()
  public set initStartDate(initStartDate: Date | string) {
    this.form.patchValue({
      startDate: initStartDate instanceof Date
        ? toLocalDateTime(initStartDate)
        : initStartDate
    }, { emitEvent: false });
  }

  @Input()
  public set initEndDate(initEndDate: Date | string) {
    this.form.patchValue({
      endDate: initEndDate instanceof Date
        ? toLocalDateTime(initEndDate)
        : initEndDate
    }, { emitEvent: false }); 
  }

  @Input()
  private initRecurrence: Recurrence = 'noRecurrence';

  @Input()
  private initRecurrenceEnd: RecurrenceEnd = 'on';

  public form = this.fb.group({
    startDate: [''],
    endDate: [''],
    recurrence: [{ value: this.initRecurrence, disabled: true }],
    recurrenceEnd: [this.initRecurrenceEnd],
    recurrenceUntil: [{ value: '', disabled: this.initRecurrenceEnd === 'after' }],
    recurrenceAfterTimes: [{ value: '', disabled: this.initRecurrenceEnd === 'on' }, [Validators.min(0)]],
    recurrenceInterval: [1, Validators.min(1)],
  }, {validators: [
    AppValidators.allOrNone('startDate', 'endDate'),
    AppValidators.dateBefore('startDate', 'endDate'),
    AppValidators.ifMatchValueOtherFilled('recurrenceEnd', 'after', 'recurrenceAfterTimes'),
    AppValidators.ifMatchValueOtherFilled('recurrenceEnd', 'on', 'recurrenceUntil')
  ]});

  public recurrences: Recurrence[] = [
    this.initRecurrence,
    'daily',
    'weekly',
    'monthly',
    'yearly',
  ];

  public recurrenceEndOn: RadioButtonInput = {
    label: 'on',
    value: 'on'
  };

  public recurrenceEndAfter: RadioButtonInput = {
    label: 'after',
    value: 'after'
  };

  public columns = 11;
  public recurrenceDateColumns = 5;
  public recurrenceLabelColumns = 5;
  public recurrenceNumberColumns = 3;

  public result: Period[] = [];

  public onChange?: (value: Period[]) => void;
  public onTouched?: () => void;

  private destroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private schedulerService: SchedulerService,
    private store: Store,
  ) {
    this.touched();
    this.datesChanged();
    this.recurrenceEndChanged();
  }

  public ngOnInit(): void {
    if (this.form.value.startDate && this.form.value.endDate) {
      this.form.controls.recurrence.enable();
    }
  }
  
  private touched() {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe(() => this.onTouched && this.onTouched());
  }

  private datesChanged(): void {
    combineLatest([
      this.form.controls.startDate.valueChanges,
      this.form.controls.endDate.valueChanges
    ])
      .pipe(takeUntil(this.destroy))
      .subscribe(([startDate, endDate]) => {
        if (startDate && endDate) {
          this.result.push({
            startDate: new Date(startDate),
            endDate: new Date(endDate)
          });
          this.onChange && this.onChange(this.result);
          this.form.controls.recurrence.enable();
        }
      });
  }
  
  private recurrenceEndChanged() {
    this.form.controls.recurrenceEnd.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe(recurrenceEnd => {
        switch(recurrenceEnd) {
          case 'on':
            this.form.controls.recurrenceAfterTimes.disable();
            this.form.controls.recurrenceUntil.enable();
            break;
          case 'after':
            this.form.controls.recurrenceAfterTimes.enable();
            this.form.controls.recurrenceUntil.disable();
            break;
        }
      })
  }

  public get everyRecurrenceLabel(): string {
    const isSingle = Number(this.form.value.recurrenceInterval) === 1;
    switch(this.form.value.recurrence) {
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
  }

  public generate(): void {    
    const result = this.schedulerService.calculateSchedules(
      this.createInitalSchedules(),
      this.createRecurrenceOptions()
    );

    if (result) {
      this.result = this.result
        ? [...this.result, ...result]
        : result;
      this.onChange && this.onChange(this.result);
      this.store.dispatch(CoreActions.setFeedback({
        type: FeedbackType.Success,
        labelMessage: 'successfullyGeneratedSchedules',
        labelAction: 'createNewSchedules'
      }));
      this.form.reset();
    }
  }

  private createInitalSchedules(): Maybe<Period> {
    return this.form.value.startDate && this.form.value.endDate
      ? {
          startDate: new Date(this.form.value.startDate),
          endDate: new Date(this.form.value.endDate),
        }
      : null;
  }

  private createRecurrenceOptions(): RecurrenceOptions {
    return {
      interval: (this.form.value.recurrenceInterval ?? 1),
      recurrence: (this.form.value.recurrence ?? 'daily'),
      repeatTimes: this.form.value.recurrenceEnd === 'after'
        ? Number(this.form.value.recurrenceAfterTimes)
        : null,
      untilDate: this.form.value.recurrenceEnd === 'on'
        ? new Date(this.form.value.recurrenceUntil ?? '')
        : null
    };
  }

  public writeValue(value: Period[]): void {
    this.result = value;
  }

  public registerOnChange(onChange: (value: Period[]) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

}
