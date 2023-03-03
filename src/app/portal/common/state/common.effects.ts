import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs';
import { GetMenuGQL, GetSocialMediaGQL, MenuItemEntity, SocialMediaEntity } from './../../../../schema/schema';
import { CommonActions } from './common.actions';

@Injectable()
export class CommonEffects {

  notFound = createEffect(() => this.actions.pipe(
    ofType(CommonActions.notFound),
    tap(() => this.router.navigate(['/portal', '404'])),
  ), { dispatch: false });

  getMenu = createEffect(() => this.actions.pipe(
    ofType(CommonActions.getMenu),
    switchMap(() => this.getMenuService.watch().valueChanges),
    map(response => CommonActions.menuRetrieved(response.data.getMenuItems?.result as MenuItemEntity[]))
  ));

  getSocialMedia = createEffect(() => this.actions.pipe(
    ofType(CommonActions.getSocialMedia),
    switchMap(() => this.getSocialMediaService.watch().valueChanges),
    map(response => CommonActions.socialMediaRetrieved(response.data.getSocialMedias?.result as SocialMediaEntity[]))
  ));

  constructor(
    private actions: Actions,
    private getMenuService: GetMenuGQL,
    private getSocialMediaService: GetSocialMediaGQL,
    private router: Router) { }
}
