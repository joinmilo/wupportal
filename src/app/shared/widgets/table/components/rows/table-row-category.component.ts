import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from 'src/app/core/typings/category';
import { TableRowComponent } from '../../typings/table';

@Component({
  selector: 'app-table-row-address',
  template: `
    <app-category-piece
      [category]="input">
    </app-category-piece>
  `,
})
export class TableRowCategoryComponent implements TableRowComponent<Category> {

  @Input()
  public input?: Category;

  @Output()
  public valueChanged = new EventEmitter<Category>();

  constructor(
    private store: Store,
  ) { }
}
