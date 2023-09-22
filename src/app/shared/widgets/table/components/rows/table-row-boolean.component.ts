import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableRowComponent } from '../../typings/table';

@Component({
  selector: 'app-table-row-boolean',
  template: `
    <fa-icon [icon]="input 
      ? ['fas', 'check'] 
      : ['fas', 'xmark']">
    </fa-icon>
  `,
})
export class TableRowBooleanComponent implements TableRowComponent<boolean> {
  
  @Input()
  public input?: boolean;

  @Output()
  public valueChanged = new EventEmitter<boolean>();

  constructor(
    private store: Store,
  ) { }

}