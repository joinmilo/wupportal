import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableCellComponent } from '../../typings/cell';

@Component({
  selector: 'app-table-cell-color',
  template: `
    <div [ngStyle]="{
      'background-color': input,
      'height': '1.5rem',
      'width': '1.5rem',
      'border': '1px solid var(--color-border)',
      'border-radius': '.5rem',
    }">
    </div>
  `,
})
export class TableCellColorComponent extends TableCellComponent<string> {

  constructor(
    store: Store,
  ) { super(store); }

}