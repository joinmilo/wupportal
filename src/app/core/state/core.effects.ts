import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { filter, map, switchMap, tap } from 'rxjs/operators';
import { GetServerVersionGQL } from 'src/schema/schema';
import { FeedbackService } from '../services/feedback/feedback.service';
import { CoreActions } from './core.actions';

@Injectable()
export class CoreEffects {

  getServerVersion = createEffect(() => this.actions.pipe(
    ofType(CoreActions.getServerVersion),
    switchMap(() => this.serverVersionService.watch().valueChanges),
    filter(response => !!response?.data?.getInformation?.version),
    map(response => CoreActions.serverVersionRetrieved(response.data.getInformation))
  ));

  setFeedback = createEffect(() => this.actions.pipe(
    ofType(CoreActions.setFeedback),
    tap(action => this.feedbackService.open(action.feedback)),
  ), { dispatch: false });

  constructor(
    private actions: Actions,
    private feedbackService: FeedbackService,
    private serverVersionService: GetServerVersionGQL,) {}
}
