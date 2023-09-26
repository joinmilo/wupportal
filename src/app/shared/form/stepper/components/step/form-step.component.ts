import { Component, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { FormStepperActions } from '../../state/form-stepper.actions';
import { selectCurrentStepIdx, selectLastStepIdx } from '../../state/form-stepper.selectors';

@Component({
  selector: 'app-form-step',
  templateUrl: './form-step.component.html',
  styleUrls: ['./form-step.component.scss']
})
export class FormStepComponent implements OnDestroy {

  @Input()
  public descriptionLabel?: string;

  @Input()
  public icon?: IconProp;

  @Input({ required: true })
  public formGroup!: FormGroup;

  @Input({ required: true })
  public titleLabel?: string;

  @Input()
  public hideToggle = false;

  public currentStepIdx?: number;
  public lastStepIdx?: number;
  public index?: number;

  public entered = false;
  public left = false;

  public resetValue?: unknown;

  private destroy = new Subject<void>();

  constructor(
    private store: Store,
  ) { }

  public register(index: number): void {
    this.index = index;
    this.resetValue = this.formGroup.value;
    this.store.dispatch(FormStepperActions.registerStep(this.index, this.formGroup.status));
    this.formGroup.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe(() => this.store.dispatch(FormStepperActions.statusChanged(this.index as number, this.formGroup.status)))

    this.initLastStep();
    this.initCurrentStep();
  }
  
  private initLastStep(): void {
    this.store.select(selectLastStepIdx)
      .pipe(takeUntil(this.destroy))
      .subscribe(lastStep => this.lastStepIdx = lastStep);
  }

  private initCurrentStep(): void {
    this.store.select(selectCurrentStepIdx)
      .pipe(takeUntil(this.destroy))
      .subscribe(currentStepIdx => {
        this.currentStepIdx = currentStepIdx

        if (this.currentStepIdx === this.index) {
          this.entered = true;
        }

        if (this.entered && this.currentStepIdx !== this.index) {
          this.left = true;
        }
      });
  }

  public isInvalid(): boolean {
    return this.left && this.formGroup.invalid;
  }

  public setCurrentStep(): void {
    this.store.dispatch(FormStepperActions.setCurrentStepIdx((this.index || 0)));
  }

  public back(): void {
    this.store.dispatch(FormStepperActions.back());
  }
  
  public next(): void {
    this.store.dispatch(FormStepperActions.next());
  }

  public showBackButton(): boolean {
    return this.index !== 0;
  }

  public showNextButton(): boolean {
    return this.index !== this.lastStepIdx;
  }

  public reset(): void {
    if (this.resetValue) {
      this.formGroup.reset(this.resetValue);
    }
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}