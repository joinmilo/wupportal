import { FormControlStatus } from '@angular/forms';
import { createReducer, on } from '@ngrx/store';
import { FormStepperActions } from './form-stepper.actions';

export interface FormStepperState {
  currentStepIdx: number,
  steps: Map<number, FormControlStatus>;
  
  dirty: boolean,
  linear: boolean,
}

export const initialState: FormStepperState = {
  currentStepIdx: 0,
  steps: new Map<number, FormControlStatus>(),

  dirty: false,
  linear: false,
};

export const formStepperReducer = createReducer(
  initialState,

  on(
    FormStepperActions.registerStep,
    FormStepperActions.statusChanged,
    (state, action): FormStepperState => (
      { ...state, steps: new Map(state.steps.set(action.index, action.status)) }
    )
  ),

  on(FormStepperActions.setCurrentStepIdx, (state, action): FormStepperState => (
    { ...state, currentStepIdx: action.index }
  )),

  on(FormStepperActions.back, (state): FormStepperState => (
    { ...state, currentStepIdx: state.currentStepIdx < 1
       ? 0
       : state.currentStepIdx - 1
    }
  )),

  on(FormStepperActions.next, (state): FormStepperState => (
    { ...state, currentStepIdx: state.currentStepIdx + 1 }
  )),

  on(FormStepperActions.setLinear, (state, action): FormStepperState => (
    { ...state, linear: action.linear }
  )),

  on(FormStepperActions.statusChanged, (state): FormStepperState => (
    { ...state, dirty: true }
  )),

  on(FormStepperActions.resetState, (): FormStepperState => (
    { ...initialState }
  )),
);
