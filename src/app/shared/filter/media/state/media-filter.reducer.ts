import { createReducer, on } from '@ngrx/store';
import { InfoMediaCategoryEntity, Maybe } from 'src/app/core/api/generated/schema';
import { MediaFilterActions } from './media-filter.actions';

export interface MediaFilterState {
  categories?: Maybe<InfoMediaCategoryEntity[]>,
}

export const initialState: MediaFilterState = { };

export const mediaFilterReducer = createReducer(
  initialState,

  on(MediaFilterActions.setCategories, (state, action): MediaFilterState => (
    { ...state, categories: action.result }
  )),

);
