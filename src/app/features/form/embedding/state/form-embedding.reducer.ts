import { createReducer, on } from '@ngrx/store';
import { Maybe, UserContextEntity } from 'src/schema/schema';
import { FormEmbeddingActions } from './form-embedding.actions';

export interface FormEmbeddingState {
  recentForms?: Maybe<UserContextEntity[]>,
}

export const initialState: FormEmbeddingState = { };

export const formEmbeddingReducer = createReducer(
  initialState,

  on(FormEmbeddingActions.setRecentForms, (state, action): FormEmbeddingState => (
    { ...state, recentForms: action.forms }
  )),
);
