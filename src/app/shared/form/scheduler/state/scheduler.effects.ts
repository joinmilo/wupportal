import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { CoreActions } from 'src/app/core/state/actions/core.actions';
import { FeedbackType } from 'src/app/core/typings/feedback';
import { SchedulerActions } from './scheduler.actions';


@Injectable()
export class SchedulerEffects {

  createdSuccessfully = createEffect(() => this.actions.pipe(
    ofType(SchedulerActions.generateResult),
    map(() => CoreActions.setFeedback({
      type: FeedbackType.Success,
      labelMessage: 'successfullyGeneratedSchedules',
      labelAction: 'createNewSchedules'
    })),
  ));

  constructor(
    private actions: Actions,
  ) {}
}
