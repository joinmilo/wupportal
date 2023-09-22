/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableRowComponent } from '../../typings/table';

@Component({
  selector: 'app-table-row-default',
  template: `
    <span> {{ input }}</span>

    <!-- <mat-form-field *ngIf="inlineEditMode
      && column.editable
      && row.id === editRow?.id; else rowTemplate"
      appearance="outline"
      [hideRequiredMarker]="true">
      <mat-label [appLabel]="row.label"></mat-label>
      <input matInput [formControlName]="column.field">
    </mat-form-field> -->
  `,
})
export class TableRowDefaultComponent implements TableRowComponent<any> {
  
  @Input()
  public input?: any;

  @Output()
  public valueChanged = new EventEmitter<any>();

  constructor(
    private store: Store,
  ) { }

}
