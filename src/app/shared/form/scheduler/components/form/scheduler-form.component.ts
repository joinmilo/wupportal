import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Period } from 'src/app/core/typings/period';
import { SchedulerActions } from '../../state/scheduler.actions';
import { selectGenerationPerformed, selectRecurrenceType, selectResult } from '../../state/scheduler.selectors';

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

  public generationPerformed = this.store.select(selectGenerationPerformed);

  public recurrenceType = this.store.select(selectRecurrenceType);

  public onChange?: (value: Period[]) => void;
  public onTouched?: () => void;

  private destroy = new Subject<void>();

  constructor(
    private store: Store,
  ) {
    this.store.select(selectResult)
      .pipe(takeUntil(this.destroy))
      .subscribe(result => this.onChange?.(result))
  }

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
