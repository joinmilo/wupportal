import { Injectable } from '@angular/core';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { GetAdminFooterParentsGQL } from 'src/app/admin/api/generated/get-admin-footer.query.generated';
import { AdminFooterParentEntity } from 'src/app/core/api/generated/schema';
import { AdminFooterActions } from './admin-footer.actions';

@Injectable()
export class AdminFooterEffects implements OnInitEffects {

  ngrxOnInitEffects(): Action {
    return AdminFooterActions.init();
  }

  getMenu = createEffect(() => this.actions.pipe(
    ofType(AdminFooterActions.init),
    switchMap(() => this.getAdminFooterParentsService.watch().valueChanges),
    map(response => AdminFooterActions.setAdminMenu(response.data.getAdminFooterParents?.result as AdminFooterParentEntity[])),
  ));

  constructor(
    private actions: Actions,
    private getAdminFooterParentsService: GetAdminFooterParentsGQL,
  ) { }
}
