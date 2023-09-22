import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Store } from '@ngrx/store';
import { TableRowComponent } from '../../typings/table';

@Component({
  selector: 'app-table-row-icon',
  template: `
    <fa-icon *ngIf="input"
      [icon]="input">
    </fa-icon> `,
})
export class TableRowIconComponent implements TableRowComponent<IconProp> {
  
  @Input()
  public input?: IconProp;

  @Output()
  public valueChanged = new EventEmitter<IconProp>();

  constructor(
    private store: Store,
  ) { }

}
