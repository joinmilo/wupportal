import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableRowComponent } from '../../typings/table';

@Component({
  selector: 'app-table-row-color',
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
export class TableRowColorComponent implements TableRowComponent<string> {
  
  @Input()
  public input?: string;

  @Output()
  public valueChanged = new EventEmitter<string>();

  constructor(
    private store: Store,
  ) { }

}