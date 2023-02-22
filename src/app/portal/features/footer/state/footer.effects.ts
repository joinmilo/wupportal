import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { GetFooterGQL, MenuItemEntity } from './../../../../../schema/schema';
import { FooterActions } from './footer.actions';

@Injectable()
export class FooterEffects {

  getFooter = createEffect(() => this.actions.pipe(
    ofType(FooterActions.getFooter),
    switchMap(() => this.getFooterService.watch().valueChanges),
    map(response => FooterActions.setCurrentFooter(response.data.getMenuItems as MenuItemEntity[]))
  ))

  constructor(
    private actions: Actions,
    private getFooterService: GetFooterGQL
  ) { }
}
