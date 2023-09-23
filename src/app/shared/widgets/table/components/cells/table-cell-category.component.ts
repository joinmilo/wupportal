import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from 'src/app/core/typings/category';
import { TableCellComponent } from '../../typings/cell';

@Component({
  selector: 'app-table-cell-address',
  template: `
    <app-category-piece
      [category]="input">
    </app-category-piece>
  `,
})
export class TableCellCategoryComponent extends TableCellComponent<Category> {

  constructor(
    store: Store,
  ) { super(store); }
}
