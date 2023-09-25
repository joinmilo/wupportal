import { createReducer, on } from '@ngrx/store';
import { FormStepperActions } from './form-stepper.actions';

export interface FormStepperState {
  currentStep: number,
  changesMade: boolean,
  lastStep: number,
  linear: boolean,
}

export const initialState: FormStepperState = {
  currentStep: 0,
  changesMade: false,
  lastStep: 0,
  linear: false,
};

export const formStepperReducer = createReducer(
  initialState,

  on(FormStepperActions.setCurrentStep, (state, action): FormStepperState => (
    { ...state, currentStep: action.index }
  )),

  on(FormStepperActions.back, (state): FormStepperState => (
    { ...state, currentStep: state.currentStep < 1
       ? 0
       : state.currentStep - 1
    }
  )),

  on(FormStepperActions.next, (state): FormStepperState => (
    { ...state, currentStep: state.currentStep + 1 }
  )),

  on(FormStepperActions.setLastStep, (state, action): FormStepperState => (
    { ...state, lastStep: action.index }
  )),

  on(FormStepperActions.setLinear, (state, action): FormStepperState => (
    { ...state, linear: action.linear }
  )),

  on(FormStepperActions.changesMade, (state): FormStepperState => (
    { ...state, changesMade: true }
  )),

  on(FormStepperActions.resetState, (): FormStepperState => (
    initialState
  )),
);
