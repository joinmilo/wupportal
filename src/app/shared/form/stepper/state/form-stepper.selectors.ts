import { createFeatureSelector, createSelector } from '@ngrx/store';
import { formStepperStateKey } from '../constants/form-stepper.constants';
import { FormStepperState } from './form-stepper.reducer';

export const selectFormStepperState = createFeatureSelector<FormStepperState>(formStepperStateKey);

export const selectCurrentStepIdx = createSelector(
  selectFormStepperState,
  state => state.currentStepIdx
);

export const selectSteps = createSelector(
  selectFormStepperState,
  state => state.steps
);

export const selectLastStepIdx = createSelector(
  selectSteps,
  steps => steps.size - 1
);

export const selectIsDirty = createSelector(
  selectFormStepperState,
  state => state.dirty
);

export const selectIsValid = createSelector(
  selectSteps,
  steps => !Array.from(steps.values()).some(status => status === 'INVALID')
);

export const selectLinear = createSelector(
  selectFormStepperState,
  state => state.linear
);


