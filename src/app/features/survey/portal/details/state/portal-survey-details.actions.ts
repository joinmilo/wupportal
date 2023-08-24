import { createActionGroup } from '@ngrx/store';
import { Maybe, SurveyEntity } from 'src/app/core/api/generated/schema';

export const PortalSurveyDetailsActions = createActionGroup({
  source: 'Portal Survey Details',
  events: {
    'get details': (slug: Maybe<string>) => ({ slug }),
    'set details': (survey: Maybe<SurveyEntity>) => ({ survey }),

  }
});