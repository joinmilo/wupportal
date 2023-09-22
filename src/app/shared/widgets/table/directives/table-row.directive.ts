/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, Input, OnDestroy, OnInit, Type, ViewContainerRef } from '@angular/core';
import { Observable, Subject, isObservable, takeUntil } from 'rxjs';
import { Maybe } from 'src/app/core/api/generated/schema';
import { fieldValue } from 'src/app/core/utils/reflection.utils';
import { TableRowAddressComponent } from '../components/rows/table-row-address.component';
import { TableRowBooleanComponent } from '../components/rows/table-row-boolean.component';
import { TableRowCategoryComponent } from '../components/rows/table-row-category.component';
import { TableRowColorComponent } from '../components/rows/table-row-color.component';
import { TableRowDefaultComponent } from '../components/rows/table-row-default.component';
import { TableRowIconComponent } from '../components/rows/table-row-icon.component';
import { TableRowMediaComponent } from '../components/rows/table-row-media.component';
import { Column, TableRowComponent } from '../typings/table';

@Directive({
  selector: '[appRow]'
})
export class RowDirective<T> implements OnInit, OnDestroy {

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
          this.createComponent( TableRowAddressComponent, value);
          break;
        case 'CATEGORY':
          this.createComponent(TableRowCategoryComponent, value);
          break;
        case 'COLOR':
          this.createComponent(TableRowColorComponent, value);
          break;
        case 'BOOLEAN':
          this.createComponent(TableRowBooleanComponent, value);
          break;
        case 'DATE':
          this.createComponent(TableRowDefaultComponent, new Date(value).toLocaleDateString());
          break;
        case 'DATETIME':
          this.createComponent(TableRowDefaultComponent, this.dateTime(value));
          break;
        case 'ICON':
          this.createComponent(TableRowIconComponent, value);
          break;
        case 'LIST':
          this.createComponent(TableRowDefaultComponent, value.length.toString());
          break;
        case 'MEDIA':
          this.createComponent(TableRowMediaComponent, value);
          break;
        case 'TIME':
          this.createComponent(TableRowDefaultComponent, this.time(value));
          break;
        default:
          this.createComponent(TableRowDefaultComponent, value);
      }
    } else {
      this.display = ' - ';
    }
  }

  private createComponent<T>(component: Type<TableRowComponent<T>>, input: T) {
    const instance = this.viewContainer
      .createComponent<TableRowComponent<T>>(component)
      .instance;
    
    instance.input = input;
    instance.valueChanged
      .pipe(takeUntil(this.destroy))
      .subscribe(newValue => console.log(newValue))
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
