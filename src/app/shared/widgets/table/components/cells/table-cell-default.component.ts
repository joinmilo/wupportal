/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableCellComponent } from '../../typings/cell';

@Component({
  selector: 'app-table-cell-default',
  template: `
    <!-- FORM AREA -->
    <mat-form-field *ngIf="(inlineEditModeActive | async)
      && column?.editable
      && row.id === (inlineEditRow | async)?.id; else cellTemplate"
      appearance="outline"
      [hideRequiredMarker]="true">
      <mat-label [appLabel]="row.label"></mat-label>
      <input matInput [formControl]="control">
    </mat-form-field>

    <!-- CELL AREA -->
    <ng-template #cellTemplate>
      <span> {{ input }}</span>
    </ng-template>
  `,
})
export class TableCellDefaultComponent extends TableCellComponent<any> {

  constructor(
    store: Store,
  ) { super(store); }

}
