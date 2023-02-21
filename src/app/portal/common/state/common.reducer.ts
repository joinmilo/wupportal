import { createReducer } from '@ngrx/store';
import { MenuItemEntity } from 'src/schema/schema';

export interface CommonState {
  menu?: MenuItemEntity[],
}

export const initialState: CommonState = {
};

export const commonReducer = createReducer(
  initialState,

);
