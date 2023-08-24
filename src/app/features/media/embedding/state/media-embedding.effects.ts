import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { InfoMediaEntity } from 'src/app/core/api/generated/schema';
import { GetInfoMediaCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-info-media-cards.query.generated';
import { MediaEmbeddingActions } from './media-embedding.actions';

@Injectable()
export class MediaEmbeddingEffects {

  getRecentMedia = createEffect(() => this.actions.pipe(
    ofType(MediaEmbeddingActions.getRecentMedia),
    switchMap(() => this.getMediaCardsService.watch({
      params: {
        sort: 'modified',
        dir: 'desc',
        size: 10,
      }
     }).valueChanges),
    map(response => MediaEmbeddingActions.setRecentMedia(response.data.getInfoMedia?.result as InfoMediaEntity[]))
  ));

  constructor(
    private actions: Actions,
    private getMediaCardsService: GetInfoMediaCardsGQL,
  ) {}
}
