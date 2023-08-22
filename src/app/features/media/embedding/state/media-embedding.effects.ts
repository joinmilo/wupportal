import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { GetInfoMediaGQL, InfoMediaEntity } from 'src/schema/schema';
import { MediaEmbeddingActions } from './media-embedding.actions';

@Injectable()
export class MediaEmbeddingEffects {

  getRecentMedia = createEffect(() => this.actions.pipe(
    ofType(MediaEmbeddingActions.getRecentMedia),
    switchMap(() => this.getMediaService.watch({
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
    private getMediaService: GetInfoMediaGQL,
  ) {}
}
