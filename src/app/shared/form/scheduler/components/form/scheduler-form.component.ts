import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
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

  public recurrenceEndOptions: RadioButtonInput[] = [
    {
      label: 'on',
      value: 'on'
    },
    {
      label: 'after',
      value: 'after'
    }
  ]

  public onChange?: (value: Period[]) => void;
  public onTouched?: () => void;

  private destroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
  ) {
    this.touched();
    this.datesChanged();
    this.recurrenceChanged();
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
  
  private recurrenceChanged() {
    this.form.controls.recurrence.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe(recurrence => {
        switch(recurrence) {
          case 'daily':

        }
      })
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
