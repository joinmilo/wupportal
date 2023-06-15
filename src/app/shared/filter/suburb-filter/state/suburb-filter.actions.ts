import { createActionGroup, emptyProps } from '@ngrx/store';
import { SuburbEntity } from 'src/schema/schema';

export const SuburbFilterActions = createActionGroup({
  source: 'Suburb Filter',
  events: {
    'get suburbs': emptyProps(),
    'set suburbs': (result: SuburbEntity[]) => ({ result }), 
  }
});




