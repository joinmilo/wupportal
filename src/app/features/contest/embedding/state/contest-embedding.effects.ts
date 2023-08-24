import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { ContestEntity } from 'src/app/core/api/generated/schema';
import { GetContestCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-contest-cards.query.generated';
import { ContestEmbeddingActions } from './contest-embedding.actions';

@Injectable()
export class ContestEmbeddingEffects {

  getRecentContests = createEffect(() => this.actions.pipe(
    ofType(ContestEmbeddingActions.getRecentContests),
    switchMap(() => this.getContestsService.watch({
      params: {
        sort: 'modified',
        dir: 'desc',
        size: 10,
      }
     }).valueChanges),
    map(response => ContestEmbeddingActions.setRecentContests(response.data.getContests?.result as ContestEntity[]))
  ));

  constructor(
    private actions: Actions,
    private getContestsService: GetContestCardsGQL,
  ) {}
}
