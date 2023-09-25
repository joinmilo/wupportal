import { FormControlStatus } from '@angular/forms';
import { createActionGroup, emptyProps } from '@ngrx/store';

export const FormStepperActions = createActionGroup({
  source: 'Form Stepper Actions',
  events: {
    'register step': (index: number, status: FormControlStatus) => ({index, status }),
    'set current stepIdx': (index: number) => ({ index }),
    'back': emptyProps(),
    'next': emptyProps(),

    'set linear': (linear: boolean) => ({ linear }),

    'status changed': (index: number, status: FormControlStatus) => ({ index, status }),

    'steps reset': emptyProps(),
    'reset state': emptyProps(),
  },
});
