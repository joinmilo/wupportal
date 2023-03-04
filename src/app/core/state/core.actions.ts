import { createActionGroup, emptyProps } from '@ngrx/store';
import { InformationDto, LabelEntity, Maybe } from 'src/schema/schema';
import { Feedback } from '../typings/feedback';

export const CoreActions = createActionGroup({
  source: 'Core',
  events: {
    'get labels': emptyProps(),
    'set labels': (labels: LabelEntity[]) => ({ labels }),
    'save label': (entity: LabelEntity) => ({ entity }),
    'label saved': (entity: LabelEntity) => ({ entity }),

    'get server version': emptyProps(),
    'set server version': (version?: Maybe<InformationDto>) => ({ version }),
    
    'set feedback': (feedback: Feedback) => ({ feedback }),
  },
});




