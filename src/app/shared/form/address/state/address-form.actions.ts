import { createActionGroup, emptyProps } from '@ngrx/store';
import { Maybe, SuburbEntity } from 'src/app/core/api/generated/schema';

export const AddressFormActions = createActionGroup({
  source: 'Address Form',
  events: {
    'get suburbs': emptyProps(),
    'suburbs retrieved': (result?: Maybe<SuburbEntity[]>) => ({ result }),
  }
});
