/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Maybe } from 'src/app/core/api/generated/schema';
import { fieldValue } from 'src/app/core/utils/reflection.utils';
import { selectInlineEditActive, selectInlineEditRow } from '../state/table.selectors';
import { Column } from './table';

@Directive() 
export abstract class TableCellComponent<T> implements OnInit, OnChanges {

  @Input()
  public column?: Maybe<Column<any>>;

  @Input()
  public row?: any;

  @Input()
  public transformation?: (input?: any) => T;

  public control = new FormControl();

  public input?: T;

  public inlineEditModeActive = this.store.select(selectInlineEditActive);
  public inlineEditRow = this.store.select(selectInlineEditRow);

  constructor(
    protected store: Store,
  ) {}

  public ngOnInit(): void {
    this.createInput();
  }

  public ngOnChanges(): void {
    this.createInput();
  }

  private createInput(): void {
    if (this.row && this.column) {
      const value = fieldValue(this.row, this.column?.field);
      this.input = this.transformation
        ? this.transformation(value)
        : value;

      this.control.patchValue(this.input);
    }
  }

}