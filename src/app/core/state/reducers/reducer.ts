import { CoreUserState, coreUserReducer } from './core-user.reducer';
import { CoreState, coreReducer } from './core.reducer';

export interface AppState {
  core: CoreState;
  coreUser: CoreUserState,
}

export const appReducers = {
  core: coreReducer,
  coreUser: coreUserReducer,
};