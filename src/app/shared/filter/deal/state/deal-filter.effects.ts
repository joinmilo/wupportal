import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { DealCategoryEntity } from 'src/app/core/api/generated/schema';
import { GetDealCategoriesGQL } from '../api/generated/get-deal-categories.query.generated';
import { DealFilterActions } from './deal-filter.actions';

@Injectable()
export class DealFilterEffects {

  getCategories = createEffect(() => this.actions.pipe(
    ofType(DealFilterActions.getCategories),
    switchMap(() => this.getCategoriesService.watch().valueChanges),
    map(response => DealFilterActions.setCategories(response.data.getDealCategories?.result as DealCategoryEntity[]))
  ));

  constructor(
    private actions: Actions,
    private getCategoriesService: GetDealCategoriesGQL,
  ) { }
}
