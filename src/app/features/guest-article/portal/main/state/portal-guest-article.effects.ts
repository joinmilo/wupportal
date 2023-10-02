import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs';
import { ArticleEntity } from 'src/app/core/api/generated/schema';
import { portalUrl } from 'src/app/core/constants/module.constants';
import { SaveGuestArticleGQL } from '../../../api/generated/guest-article-save.mutation.generated';
import { PortalGuestArticleActions } from './portal-guest-article.actions';

@Injectable()
export class PortalGuestArticleEffects {

  saveReport = createEffect(() => this.actions.pipe(
    ofType(PortalGuestArticleActions.saveArticle),
    switchMap((action) => this.saveArticleService.mutate({
      entity: action.entity
    })),
    map(response => PortalGuestArticleActions.articleSaved(response.data?.saveGuestArticle as ArticleEntity))
  ));

  articleSaved = createEffect(() => this.actions.pipe(
    ofType(PortalGuestArticleActions.articleSaved),
    tap(() => this.router.navigate(['/', portalUrl, 'guestarticle', 'success'])),
  ), {dispatch: false});

  constructor(
    private actions: Actions,
    private router: Router,
    private saveArticleService: SaveGuestArticleGQL,
  ) { }
}
