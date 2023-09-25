import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Store } from '@ngrx/store';
import { FormStepperActions } from '../../state/form-stepper.actions';
import { selectCurrentStep, selectLastStep } from '../../state/form-stepper.selectors';

@Component({
  selector: 'app-form-step',
  templateUrl: './form-step.component.html',
  styleUrls: ['./form-step.component.scss']
})
export class FormStepComponent {

  @Input()
  public icon?: IconProp;

  @Input({ required: true })
  public titleLabel?: string;

  @Input()
  public descriptionLabel?: string;

  @Input()
  public hideToggle = false;

  public currentStep = this.store.select(selectCurrentStep);

  public lastStep = this.store.select(selectLastStep);

  public index?: number;

  constructor(
    private store: Store,
  ) { }

  public setCurrentStep(): void {
    this.store.dispatch(FormStepperActions.setCurrentStep((this.index || 0)));
  }

  public back(): void {
    this.store.dispatch(FormStepperActions.back());
  }
  
  public next(): void {
    this.store.dispatch(FormStepperActions.next());
  }

}