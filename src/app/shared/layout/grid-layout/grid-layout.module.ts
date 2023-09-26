import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RowComponent } from './component/row.component';
import { ColumnDirective } from './directive/column.directive';

const components = [
  RowComponent,
];

const directives = [
  ColumnDirective,
]

const framework = [
  CommonModule,
];

@NgModule({
  declarations: [
    ...components,
    ...directives
  ],
  imports: [
    ...framework,
  ],
  exports: [
    ...components,
    ...directives
  ],
})
export class GridLayoutModule { }