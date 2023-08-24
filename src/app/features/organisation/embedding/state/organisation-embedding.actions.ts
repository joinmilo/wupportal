import { createActionGroup, emptyProps } from '@ngrx/store';
import { OrganisationEntity } from 'src/app/core/api/generated/schema';

export const OrganisationEmbeddingActions = createActionGroup({
  source: 'Organisation Embedding',
  events: {
    'get recent organisations': emptyProps(),
    'set recent organisations': (organisations?: OrganisationEntity[]) => ({ organisations }),
  }
});




