import { createReducer, on } from '@ngrx/store';
import { Maybe, MenuItemEntity, SocialMediaEntity } from 'src/schema/schema';
import { CommonActions } from './common.actions';

export interface CommonState {
  menu?: Maybe<MenuItemEntity[]>,
  socialMedia?: Maybe<SocialMediaEntity[]>,
}

export const initialState: CommonState = {
};

export const commonReducer = createReducer(
  initialState,

  on(CommonActions.menuRetrieved, (state, action): CommonState => (
    { ...state, menu: action.menuItems }
  )),

  on(CommonActions.socialMediaRetrieved, (state, action): CommonState => (
    { ...state, socialMedia: action.socialMedia }
  ))
);
