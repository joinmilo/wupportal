import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subject, combineLatest, takeUntil } from 'rxjs';
import { Maybe } from 'src/app/core/api/generated/schema';
import { Period } from 'src/app/core/typings/period';
import { toLocalDateTime } from 'src/app/core/utils/date.utils';
import { AppValidators } from 'src/app/core/validators/validators';
import { RadioButtonInput } from '../../../radio-button/typings/radio-button-input';
import { Recurrence, RecurrenceEnd } from '../../typings/scheduler';

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
    recurrenceEndOn: [{ value: '', disabled: this.initRecurrenceEnd === 'after' }],
    recurrenceEndAfter: [{ value: '', disabled: this.initRecurrenceEnd === 'on' }],
    recurrenceRepetitions: [1, Validators.min(1)],
    result: [[] as Period[]],
  }, {validators: [
    AppValidators.allOrNone('startDate', 'endDate'),
    AppValidators.dateBefore('startDate', 'endDate')
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

  public recurrenceColumns = 8;
  public recurrenceDateColumns = 4;
  public recurrenceLabelColumns = 4;
  public recurrenceNumberColumns = 2;

  public onChange?: (value: Period[]) => void;
  public onTouched?: () => void;

  private destroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
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
      .subscribe(([start, end]) => {
        if (start && end) {
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
            this.form.controls.recurrenceEndAfter.disable();
            this.form.controls.recurrenceEndOn.enable();
            break;
          case 'after':
            this.form.controls.recurrenceEndAfter.enable();
            this.form.controls.recurrenceEndOn.disable();
            break;
        }
      })
  }

  public get everyRecurrenceLabel(): string {
    const isSingle = Number(this.form.value.recurrenceRepetitions) === 1;
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

  public writeValue(value?: Maybe<Period[]>): void {
    this.form.patchValue({
      result: value
    }, { emitEvent: false });
  }

  public registerOnChange(onChange: (value: Period[]) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

}
