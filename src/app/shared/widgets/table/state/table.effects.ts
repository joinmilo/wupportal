import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { debounceTime, filter, map, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { TableActions } from './table.actions';
import { selectInlineEditAction, selectInlineEditRow, selectQueryParams } from './table.selectors';

@Injectable()
export class TableEffects {

  init = createEffect(() => this.actions.pipe(
    ofType(TableActions.init),
    switchMap(() => this.activatedRoute.queryParams),
    debounceTime(0), //TODO: race condition activated route and ngrxOnInitEffects
    take(1),
    map(params => TableActions.queryParamsInitialized(params))
  ));

  setQueryParams = createEffect(() => this.actions.pipe(
    ofType(TableActions.setParams),
    withLatestFrom(
      this.store.select(selectQueryParams),
    ),
    filter(([, isQueryParam]) => isQueryParam),
    tap(([action, ]) => this.router.navigate([], {
      queryParams: action.params,
      queryParamsHandling: 'merge',
    })),
  ), { dispatch: false });

  rowEdited = createEffect(() => this.actions.pipe(
    ofType(TableActions.rowEdited),
    withLatestFrom(
      this.store.select(selectInlineEditAction),
      this.store.select(selectInlineEditRow),
    ),
    tap(([, tableAction, row ]) => {
      tableAction?.callback?.(row);
    }),
    map(() => TableActions.rowEditCancelled())
  ));

  constructor(
    private actions: Actions,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store,
  ) { }
}
