import { createReducer, on } from '@ngrx/store';
import { PageEntity } from 'src/schema/schema';
import { PageActions } from './page.actions';

export interface PageState {
  page: PageEntity,
}

export const initialState: PageState = {
  page: {}
};

export const pageReducer = createReducer(
  initialState,

  on(PageActions.setCurrentPage, (state, action): PageState => (
    { ...state, page: action.page }
  )),

);
