import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { SuburbEntity } from 'src/app/core/api/generated/schema';
import { GetSuburbsGQL } from '../api/generated/get-suburbs.query.generated';
import { SuburbFilterActions } from './suburb-filter.actions';

@Injectable()
export class SuburbFilterEffects {

  getSuburbs = createEffect(() => this.actions.pipe(
    ofType(SuburbFilterActions.getSuburbs),
    switchMap(() => this.getSuburbsService.watch().valueChanges),
    map(response => SuburbFilterActions.setSuburbs(response.data.getSuburbs?.result as SuburbEntity[]))
  ));

  constructor(
    private actions: Actions,
    private getSuburbsService: GetSuburbsGQL,
  ) { }
}
