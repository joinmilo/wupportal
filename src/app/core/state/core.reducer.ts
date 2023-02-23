import { createReducer } from '@ngrx/store';
import { LanguageEntity } from 'src/schema/schema';

export interface CoreState {
  language?: LanguageEntity,
}

export const initialState: CoreState = {
  language: { locale: 'de' },
};

export const coreReducer = createReducer(
  initialState,

);
