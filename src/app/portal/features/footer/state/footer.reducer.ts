import { createReducer, on } from '@ngrx/store';
import { MenuItemEntity } from 'src/schema/schema';
import { FooterActions } from './footer.actions';


export interface FooterState {
  footer?: MenuItemEntity[]
}

export const initialState: FooterState = {
};

export const footerReducer = createReducer(
  initialState,

  on(FooterActions.setCurrentFooter, (state, action): FooterState => (
    { ...state, footer: action.menuItems }
  ))
);