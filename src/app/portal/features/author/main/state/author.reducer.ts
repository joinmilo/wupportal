import { createReducer } from '@ngrx/store';

export interface AuthorState {
}

export const initialState: AuthorState = {
};

export const authorReducer = createReducer(
  initialState,
  
);
