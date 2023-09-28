import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Period } from 'src/app/core/typings/period';
import { toLocalDateTime } from 'src/app/core/utils/date.utils';
import { AppValidators } from 'src/app/core/validators/validators';
import { Recurrence } from '../../typings/scheduler';

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
    this.form.patchValue({
      startDate: toLocalDateTime(initStartDate)
    }, { emitEvent: false });
  }

  @Input()
  public set initEndDate(initEndDate: Date) {
    this.form.patchValue({
      endDate: toLocalDateTime(initEndDate)
    }, { emitEvent: false }); 
  }

  @Input()
  private initRecurrence: Recurrence = 'noRecurrence';

  public form = this.fb.group({
    startDate: [''],
    endDate: [''],
    recurrence: [this.initRecurrence],
    result: [],
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

  public onChange?: (value: Period[]) => void;
  public onTouched?: () => void;

  constructor(
    private fb: FormBuilder,
  ) {}

  test(test: any) {
    console.log(test);
  }

  public writeValue(value: Period[]): void {
    // this.model.editorData = value;
  }

  public registerOnChange(onChange: (value: Period[]) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

}
