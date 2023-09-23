import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MediaEntity } from 'src/app/core/api/generated/schema';
import { TableCellComponent } from '../../typings/cell';

@Component({
  selector: 'app-table-cell-media',
  template: `
    <button mat-button *ngIf="input">
      <fa-icon [icon]="['fas', 'image']">
      </fa-icon>
    </button>
  `,
})
export class TableCellMediaComponent extends TableCellComponent<MediaEntity> {

  constructor(
    store: Store,
  ) { super(store); }
}
