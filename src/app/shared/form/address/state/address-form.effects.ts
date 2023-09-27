import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { SuburbEntity } from 'src/app/core/api/generated/schema';
import { GetSuburbsGQL } from '../api/generated/get-surbs.query.generated';
import { AddressFormActions } from './address-form.actions';


@Injectable()
export class AddressFormEffects {

  getSuburbs = createEffect(() => this.actions.pipe(
    ofType(AddressFormActions.getSuburbs),
    switchMap(() => this.getSuburbService.watch().valueChanges),
    map(response => AddressFormActions.suburbsRetrieved(response.data.getSuburbs?.result as SuburbEntity[]))
  ));

  constructor(
    private actions: Actions,
    private getSuburbService: GetSuburbsGQL,
  ) {}
}
