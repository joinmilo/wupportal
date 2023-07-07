import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { filter, map, switchMap, tap } from 'rxjs/operators';
import { GetMeGQL, UserContextEntity } from 'src/schema/schema';
import { FeedbackService } from '../../services/feedback.service';
import { CoreActions } from '../actions/core.actions';

import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { refreshKey } from '../../constants/core.constants';
import { AuthService } from '../../services/auth.service';
import { FeedbackType } from '../../typings/feedback';
import { CoreUserActions } from '../actions/core-user.actions';

@Injectable()
export class CoreUserEffects {

  ngrxOnInitEffects(): Action {
    return CoreUserActions.init();
  }

  getCurrentUser = createEffect(() => this.actions.pipe(
    ofType(
      CoreUserActions.init,
      CoreUserActions.updateUser,
    ),
    filter(() => !!localStorage.getItem(refreshKey)),
    switchMap(() => this.getMeService.watch().valueChanges),
    filter(response => !!response.data.me?.id),
    map(response => CoreUserActions.getMe(response.data.me as UserContextEntity))
  ));

  login = createEffect(() => this.actions.pipe(
    ofType(CoreUserActions.login),
    filter(action => !!action.email && !!action.password),
    switchMap((action) => this.authService.login(
      action.email,
      action.password
    )),
    filter(tokens => !!tokens),
    map(() => CoreUserActions.loggedIn())
  ));

  loggedIn = createEffect(() => this.actions.pipe(
    ofType(CoreUserActions.loggedIn),
    switchMap(() => this.getMeService.watch().valueChanges),
    filter(response => !!response.data.me?.id),
    map(response => CoreUserActions.getMe(response.data.me as UserContextEntity)),
    tap(() => this.feedbackService.open({
      type: FeedbackType.Success,
      labelMessage: 'youreLoggedIn'
    })),
    tap(() => this.router.navigate([''])), //TODO: Route to admin or user portal
  ));

  logout = createEffect(() => this.actions.pipe(
    ofType(CoreUserActions.logout),
    map(() => CoreActions.setFeedback({
      type: FeedbackType.Success,
      labelMessage: 'youreLoggedOut'
    }))
  ));

  refreshExpiredOrLogout = createEffect(() => this.actions.pipe(
    ofType(
      CoreUserActions.refreshExpired,
      CoreUserActions.logout
    ),
    tap(() => this.router.navigate([''])),
    tap(() => this.authService.clear()),
  ), { dispatch: false });

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private feedbackService: FeedbackService,
    private getMeService: GetMeGQL,
    private router: Router,
    ) { }
}
