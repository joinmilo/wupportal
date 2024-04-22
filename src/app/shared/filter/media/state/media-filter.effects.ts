import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { InfoMediaCategoryEntity } from 'src/app/core/api/generated/schema';
import { GetInfoMediaCategoriesGQL } from '../api/generated/get-info-media-categories.generated';
import { MediaFilterActions } from './media-filter.actions';

@Injectable()
export class MediaFilterEffects {

  getCategories = createEffect(() => this.actions.pipe(
    ofType(MediaFilterActions.getCategories),
    switchMap(() => this.getCategoriesService.watch().valueChanges),
    map(response => MediaFilterActions.setCategories(response.data.getInfoMediaCategories?.result as InfoMediaCategoryEntity[]))
  ));

  constructor(
    private actions: Actions,
    private getCategoriesService: GetInfoMediaCategoriesGQL,
  ) { }
}
