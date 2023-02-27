import { createActionGroup, emptyProps } from '@ngrx/store';
import { InformationDto, Maybe } from 'src/schema/schema';
import { Feedback } from '../typings/feedback';

export const CoreActions = createActionGroup({
  source: 'Core',
  events: {
    'get server version': emptyProps(),
    'server version retrieved': (version?: Maybe<InformationDto>) => ({ version }),
    
    'set feedback': (feedback: Feedback) => ({ feedback }),
  },
});




