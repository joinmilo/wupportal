import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Maybe } from 'src/schema/schema';
import { Column } from '../typings/table';

@Directive({
  selector: '[appRow]'
})
export class RowDirective<T> implements OnInit {

  @Input()
  public appRow?: Maybe<any>;

  @Input()
  public column?: Column<T>;

  constructor(
    private el: ElementRef) { }

  public ngOnInit(): void {
    this.el.nativeElement.innerHTML = typeof this.column?.type === 'function'
      ? this.column?.type(this.appRow)
      : this.transform();
  }

  private transform(): string {
    const value = this.column?.field.split('.').reduce((obj, i) => obj?.[i], this.appRow);
    switch(this.column?.type) {
      case 'BOOLEAN':
        return this.boolean(value);
      case 'DATE':
        return this.date(value);
      default:
        return value;
    }
  }

  private boolean(value: boolean): string {
    return value 
      ? `<fa-icon [icon]="['fas', 'check']"></fa-icon>`
      : `<fa-icon [icon]="['fas', 'cclose']"></fa-icon>`
  }

  private date(value: string): string {
    return new Date(value).toLocaleDateString();
  }

}
