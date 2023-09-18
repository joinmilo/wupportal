import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { GetLabelsGQL } from 'src/app/core/api/generated/get-labels.query.generated';
import { PageableList_LabelEntity } from 'src/app/core/api/generated/schema';
import { AdminSettingsLabelActions } from './admin-settings-label.actions';

@Injectable()
export class AdminSettingsLabelEffects {

  updateParams = createEffect(() => this.actions.pipe(
    ofType(AdminSettingsLabelActions.updateParams),
    switchMap(action => this.getLabelsService.watch({
      params: action.params,
    }).valueChanges),
    map(response => AdminSettingsLabelActions.setOverviewData(response.data.getLabels as PageableList_LabelEntity))
  ));

  constructor(
    private actions: Actions,
    private getLabelsService: GetLabelsGQL,
  ) {}
}
