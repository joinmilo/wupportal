import { createActionGroup, emptyProps } from '@ngrx/store';
import { SurveyEntity } from 'src/app/core/api/generated/schema';

export const SurveyEmbeddingActions = createActionGroup({
  source: 'Survey Embedding',
  events: {
    'get recent surveys': emptyProps(),
    'set recent surveys': (surveys?: SurveyEntity[]) => ({ surveys }),
  }
});




