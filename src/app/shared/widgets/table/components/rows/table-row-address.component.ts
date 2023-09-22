import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AddressEntity } from 'src/app/core/api/generated/schema';
import { TableRowComponent } from '../../typings/table';

@Component({
  selector: 'app-table-row-address',
  template: `
    <app-address-piece
      [address]="input">
    </app-address-piece>
  `,
})
export class TableRowAddressComponent implements TableRowComponent<AddressEntity> {

  @Input()
  public input?: AddressEntity;

  @Output()
  public valueChanged = new EventEmitter<AddressEntity>();

  constructor(
    private store: Store,
  ) { }
}
