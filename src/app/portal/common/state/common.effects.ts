import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs';
import { GetMenuGQL, MenuItemEntity } from './../../../../schema/schema';
import { CommonActions } from './common.actions';

@Injectable()
export class CommonEffects {

  notFound = createEffect(() => this.actions.pipe(
    ofType(CommonActions.notFound),
    tap(() => this.router.navigate(['/portal', '404'])),
  ), { dispatch: false });

  getFooter = createEffect(() => this.actions.pipe(
    ofType(CommonActions.getMenu),
    switchMap(() => this.getMenuService.watch().valueChanges),
    map(response => CommonActions.menuRetrieved(response.data.getMenuItems?.result as MenuItemEntity[]))
  ))

  constructor(
    private actions: Actions,
    private getMenuService: GetMenuGQL,
    private router: Router) { }
}
