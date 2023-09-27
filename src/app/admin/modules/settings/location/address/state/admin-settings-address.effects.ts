import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, map, of, switchMap, withLatestFrom } from 'rxjs';
import { DeleteAddressGQL } from 'src/app/admin/api/generated/delete-address.mutation.generated';
import { GetAddressesGQL } from 'src/app/admin/api/generated/get-addresses.query.generated';
import { PageableList_AddressEntity } from 'src/app/core/api/generated/schema';
import { CoreActions } from 'src/app/core/state/actions/core.actions';
import { FeedbackType } from 'src/app/core/typings/feedback';
import { ConfirmDeleteComponent } from 'src/app/shared/dialogs/confirm-delete/confirm-delete.component';
import { AdminSettingsAddressActions } from './admin-settings-address.actions';
import { selectParams } from './admin-settings-address.selectors';

@Injectable()
export class AdminSettingsAddressEffects {

  updateParams = createEffect(() => this.actions.pipe(
    ofType(
      AdminSettingsAddressActions.updateParams,
      AdminSettingsAddressActions.deleted
      ),
    withLatestFrom(this.store.select(selectParams)),
    switchMap(([, params]) => this.getAddressesService.watch({
      params,
    }).valueChanges),
    map(response => AdminSettingsAddressActions.setOverviewData(response.data.getAddresses as PageableList_AddressEntity))
  ));

  deleteAddress = createEffect(() => this.actions.pipe(
    ofType(AdminSettingsAddressActions.delete),
    switchMap(action => this.dialog.open(ConfirmDeleteComponent, { data: action.address?.street + ' ' + action.address?.houseNumber })
      .afterClosed().pipe(
        switchMap(confirmed => confirmed
          ? of(action.address)
          : EMPTY
        )
      )
    ),
    switchMap(address => this.deleteAddressService.mutate({
      id: address?.id
    })),
    map(() => AdminSettingsAddressActions.deleted())
  ));

  addressDeleted = createEffect(() => this.actions.pipe(
    ofType(AdminSettingsAddressActions.deleted),
    map(() => CoreActions.setFeedback({
      type: FeedbackType.Success,
      labelMessage: 'deletedSuccessfully'
    }))
  ));

  constructor(
    private actions: Actions,
    private dialog: MatDialog,
    private deleteAddressService: DeleteAddressGQL,
    private getAddressesService: GetAddressesGQL,
    private store: Store,
  ) {}
}
