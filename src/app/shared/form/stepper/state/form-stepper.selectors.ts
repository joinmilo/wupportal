import { createFeatureSelector, createSelector } from '@ngrx/store';
import { formStepperStateKey } from '../constants/form-stepper.constants';
import { FormStepperState } from './form-stepper.reducer';

export const selectFormStepperState = createFeatureSelector<FormStepperState>(formStepperStateKey);

export const selectCurrentStep = createSelector(
  selectFormStepperState,
  state => state.currentStep
);

export const selectChangesMade = createSelector(
  selectFormStepperState,
  state => state.changesMade
);

export const selectLastStep = createSelector(
  selectFormStepperState,
  state => state.lastStep
);

export const selectLinear = createSelector(
  selectFormStepperState,
  state => state.linear
);

