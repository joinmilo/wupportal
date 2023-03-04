import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';

import { filter, map, switchMap, tap } from 'rxjs/operators';
import { GetLabelsGQL, GetServerVersionGQL, LabelEntity, SaveLabelGQL } from 'src/schema/schema';
import { FeedbackService } from '../services/feedback.service';
import { CoreActions } from './core.actions';

import { Action } from '@ngrx/store';

@Injectable()
export class CoreEffects implements OnInitEffects {
  
  ngrxOnInitEffects(): Action {
    return CoreActions.getLabels();
  }

  getLabels = createEffect(() => this.actions.pipe(
    ofType(CoreActions.getLabels),
    switchMap(() => this.getLabelsService.watch().valueChanges),
    filter(response => !!response?.data?.getLabels?.result?.length),
    map(response => CoreActions.setLabels(response.data.getLabels?.result as LabelEntity[]))
  ));

  getServerVersion = createEffect(() => this.actions.pipe(
    ofType(CoreActions.getServerVersion),
    switchMap(() => this.getServerVersionService.watch().valueChanges),
    filter(response => !!response?.data?.getInformation?.version),
    map(response => CoreActions.setServerVersion(response.data.getInformation))
  ));

  saveLabel = createEffect(() => this.actions.pipe(
    ofType(CoreActions.saveLabel),
    switchMap(action => this.saveLabelService.mutate({
      entity: action.entity
    })),
    map(response => CoreActions.labelSaved(response.data?.saveLabel as LabelEntity))
  ));

  setFeedback = createEffect(() => this.actions.pipe(
    ofType(CoreActions.setFeedback),
    tap(action => this.feedbackService.open(action.feedback)),
  ), { dispatch: false });

  constructor(
    private actions: Actions,
    private feedbackService: FeedbackService,
    private getLabelsService: GetLabelsGQL,
    private getServerVersionService: GetServerVersionGQL,
    private saveLabelService: SaveLabelGQL,) {}
}
