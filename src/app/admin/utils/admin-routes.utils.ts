import { adminUrl, articlesFeatureKey, authorsFeatureKey, calendarFeatureKey, contestsFeatureKey, dealsFeatureKey, eventsFeatureKey, formsFeatureKey, guestArticlesFeatureKey, mapFeatureKey, mediaFeatureKey, organisationsFeatureKey, reportsFeatureKey, surveysFeatureKey } from 'src/app/core/constants/core.constants';
import { Maybe } from 'src/schema/schema';

export const createAdminRoutes = (featureCode?: Maybe<string>): (Maybe<string> | undefined)[][] => {
  switch (featureCode) {
    case articlesFeatureKey:
      break;
    case authorsFeatureKey:
      break;
    case calendarFeatureKey:
      break;
    case contestsFeatureKey:
      break;
    case dealsFeatureKey:
      break;
    case eventsFeatureKey:
      break;
    case formsFeatureKey:
      break;
    case guestArticlesFeatureKey:
      break;
    case mapFeatureKey:
      break;
    case mediaFeatureKey:
      break;
    case organisationsFeatureKey:
      break;
    case reportsFeatureKey:
      break;
    case surveysFeatureKey:
      break;
  }
  return [['/', adminUrl, featureCode]];
}