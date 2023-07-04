import { Params } from '@angular/router';
import { createActionGroup, emptyProps } from '@ngrx/store';
import { SurveyFilterQueryParams } from 'src/app/core/typings/filter-params/survey-filter-param';

export const SurveyFilterActions = createActionGroup({
  source: 'Survey Filter',
  events: {
    'init': emptyProps(),
    'query params initialized': (params: Params) => ({ params }),
    'browser navigated': (params: Params) => ({ params }),
    'update all': (queryParams: Params) => ({ queryParams }),
    'all updated': (params: SurveyFilterQueryParams) => ({ params }),
    'clear all': emptyProps(),
    
    'selected past': (value?: boolean) => ({ value }),
  }
});




