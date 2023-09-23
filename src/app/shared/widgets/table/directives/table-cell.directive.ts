/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, Input, OnDestroy, OnInit, Type, ViewContainerRef } from '@angular/core';
import { Observable, Subject, isObservable, takeUntil } from 'rxjs';
import { Maybe } from 'src/app/core/api/generated/schema';
import { fieldValue } from 'src/app/core/utils/reflection.utils';
import { TableCellAddressComponent } from '../components/cells/table-cell-address.component';
import { TableCellBooleanComponent } from '../components/cells/table-cell-boolean.component';
import { TableCellCategoryComponent } from '../components/cells/table-cell-category.component';
import { TableCellColorComponent } from '../components/cells/table-cell-color.component';
import { TableCellDefaultComponent } from '../components/cells/table-cell-default.component';
import { TableCellIconComponent } from '../components/cells/table-cell-icon.component';
import { TableCellMediaComponent } from '../components/cells/table-cell-media.component';
import { TableCellComponent } from '../typings/cell';
import { Column } from '../typings/table';

@Directive({
  selector: '[appRow]'
})
export class CellDirective<T> implements OnInit, OnDestroy {

  @Input()
  public appRow?: Maybe<T>;

  @Input()
  public column?: Maybe<Column<T>>;

  private destroy = new Subject<void>();

  constructor(
    private viewContainer: ViewContainerRef) { }

  public ngOnInit(): void {
    typeof this.column?.type === 'function'
      ? this.function(this.column?.type(this.appRow as T))
      : this.transform();
  }

  private function(result: Observable<Maybe<string>> | Maybe<string>): void {
    isObservable(result)
      ? result.pipe(takeUntil(this.destroy))
          .subscribe(value => this.display = value)
      : this.display = result;
  }

  private transform(): void {
    const value = fieldValue(this.appRow, this.column?.field);

    if (value !== undefined && value !== null) {
      switch(this.column?.type) {
        //TODO: Use phone piece and add type
        case 'ADDRESS':
          this.createComponent(TableCellAddressComponent);
          break;
        case 'CATEGORY':
          this.createComponent(TableCellCategoryComponent);
          break;
        case 'COLOR':
          this.createComponent(TableCellColorComponent);
          break;
        case 'BOOLEAN':
          this.createComponent(TableCellBooleanComponent);
          break;
        case 'DATE':
          this.createComponent(TableCellDefaultComponent, (value) => new Date(value).toLocaleDateString());
          break;
        case 'DATETIME':
          this.createComponent(TableCellDefaultComponent, (value) => this.dateTime(value));
          break;
        case 'ICON':
          this.createComponent(TableCellIconComponent);
          break;
        case 'LIST':
          this.createComponent(TableCellDefaultComponent, (value) => value.length.toString());
          break;
        case 'MEDIA':
          this.createComponent(TableCellMediaComponent);
          break;
        case 'TIME':
          this.createComponent(TableCellDefaultComponent, (value) => this.time(value));
          break;
        default:
          this.createComponent(TableCellDefaultComponent);
      }
    } else {
      this.display = ' - ';
    }
  }

  private createComponent<T>(
    component: Type<TableCellComponent<T>>,
    transformation?: (input?: any) => T) {
    const instance = this.viewContainer
      .createComponent<TableCellComponent<T>>(component)
      .instance;
    
    instance.column = this.column;
    instance.row = this.appRow;
    instance.transformation = transformation;
  }

  private dateTime(value: string): string {
    return `${this.date(value)}, ${this.time(value)}`;
  }

  private date(value: string): string {
    return new Date(value).toLocaleDateString();
  }

  private time(value: string): string {
    return new Date(value).toLocaleTimeString();
  }

  private set display(value: Maybe<string> | undefined) {
    this.viewContainer.element.nativeElement.innerHTML = value;
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
