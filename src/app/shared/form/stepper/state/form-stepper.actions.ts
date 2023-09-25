import { createActionGroup, emptyProps } from '@ngrx/store';

export const FormStepperActions = createActionGroup({
  source: 'Form Stepper Actions',
  events: {
    'set current step': (index: number) => ({ index }),
    'back': emptyProps(),
    'next': emptyProps(),

    'set last step': (index: number) => ({ index }),
    'set linear': (linear: boolean) => ({ linear }),

    'changes made': emptyProps(),
    'reset changes': emptyProps(),

    'reset state': emptyProps(),
  },
});




