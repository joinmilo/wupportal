import { createActionGroup, emptyProps } from '@ngrx/store';
import { InformationDto, Maybe } from 'src/schema/schema';
import { Feedback } from '../services/feedback/feedback';

export const CoreActions = createActionGroup({
  source: 'Core',
  events: {
    'Get Server Version': emptyProps(),
    'Server Version Retrieved': (version?: Maybe<InformationDto>) => ({ version }),
    
    'Set Feedback': (feedback: Feedback) => ({ feedback }),
    
    'Logout': emptyProps(),
    'Logged Out': emptyProps(),
  },
});




