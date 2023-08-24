import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { PageableList_ContestEntity } from 'src/app/core/api/generated/schema';
import { GetContestCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-contest-cards.query.generated';
import { ContestAdminOverviewActions } from './contest-admin-overview.actions';
import { selectParams } from './contest-portal-overview.selectors';

@Injectable()
export class ContestAdminOverviewEffects {

  updateParams = createEffect(() => this.actions.pipe(
    ofType(ContestAdminOverviewActions.updateParams),
    withLatestFrom(this.store.select(selectParams)),
    switchMap(([, params]) => this.getContest.watch({
      params,
    }).valueChanges),
    map(response => ContestAdminOverviewActions.setOverviewData(response.data.getContests as PageableList_ContestEntity))
  ));

  constructor(
    private actions: Actions,
    private getContest: GetContestCardsGQL,
    private store: Store,
  ) {}
}
