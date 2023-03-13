import { createReducer, on } from '@ngrx/store';
import { LanguageEntity, Maybe, ThemeEntity } from 'src/schema/schema';
import { Translatable } from '../typings/translatable';
import { CoreActions } from './core.actions';

export interface CoreState {
  currentTheme?: Maybe<ThemeEntity>,
  language?: LanguageEntity,
  labels?: Map<string, Maybe<Translatable>[]>,
  themes?: ThemeEntity[],
}

export const initialState: CoreState = {
  language: { locale: 'de' },
};

export const coreReducer = createReducer(
  initialState,

  on(CoreActions.setLabels, (state, action): CoreState => (
    { ...state,
      labels: action.labels.reduce((map, label) => 
        (label.tagId && label.translatables?.length && (map.set(label.tagId, label.translatables)), map),
      new Map())
    }
  )),

  on(CoreActions.labelSaved, (state, action): CoreState => {
    const labels = new Map(state.labels);

    action.entity.tagId && action.entity.translatables && 
      labels.set(action.entity.tagId, action.entity.translatables);

    return { ...state, labels };
  }),

  on(CoreActions.setThemes, (state, action): CoreState => (
    { ...state,
      currentTheme: action.themes?.find(theme => theme.isDefault),
      themes: action.themes
    }
  )),

);
