import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { GetUserContextsGQL, UserContextEntity } from 'src/schema/schema';
import { AuthorEmbeddingActions } from './author-embedding.actions';

@Injectable()
export class AuthorEmbeddingEffects {

  getRecentAuthors = createEffect(() => this.actions.pipe(
    ofType(AuthorEmbeddingActions.getRecentAuthors),
    switchMap(() => this.getAuthorsService.watch({
      params: {
        sort: 'created',
        dir: 'desc',
        size: 10,
      }
     }).valueChanges),
    map(response => AuthorEmbeddingActions.setRecentAuthors(response.data.getUserContexts?.result as UserContextEntity[]))
  ));

  constructor(
    private actions: Actions,
    private getAuthorsService: GetUserContextsGQL,
  ) {}
}
