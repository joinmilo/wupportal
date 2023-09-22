/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSort, SortDirection } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { Subject, merge, takeUntil, tap } from 'rxjs';
import { TableActions } from '../../state/table.actions';
import { selectActions, selectClickable, selectColumns, selectData, selectDisplayColumns, selectParams } from '../../state/table.selectors';
import { TablePaginatorComponent } from '../paginator/table-paginator.component';

@Component({
  selector: 'app-table-desktop',
  templateUrl: './table-desktop.component.html',
  styleUrls: ['./table-desktop.component.scss']
})
export class TableDesktopComponent<T> implements AfterViewInit, OnDestroy {

  public actions = this.store.select(selectActions);

  public clickable = this.store.select(selectClickable);

  public columns = this.store.select(selectColumns);

  public data = this.store.select(selectData);

  public displayedColumns = this.store.select(selectDisplayColumns);

  public initParams = this.store.select(selectParams);

  @ViewChild(TablePaginatorComponent)
  public paginator!: TablePaginatorComponent;

  @ViewChild(MatSort)
  public sort!: MatSort;

  private destroy = new Subject<void>();

  constructor(
    private store: Store,
  ) { }

  public ngAfterViewInit(): void {
    this.store.select(selectParams)
      .pipe(takeUntil(this.destroy))
      .subscribe(initParams => {
        this.sort.sort({
          id: initParams?.sort ?? '',
          start: initParams?.dir as SortDirection ?? '',
          disableClear: true
        });
      });

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    
    merge(this.sort.sortChange, this.paginator.page).pipe(
      tap(() => this.store.dispatch(
        TableActions.paramsUpdated({
          dir: this.sort.direction,
          sort: this.sort.active,
          page: this.paginator.pageIndex,
          size: this.paginator.pageSize,
        })
      )),
      takeUntil(this.destroy),
    ).subscribe();
  }

  public rowClicked(row: T): void {
    this.store.dispatch(TableActions.rowClicked(row));
  }

  // private initForm(columns: Column<T>[] | undefined): void {
  //   columns?.forEach(column => {
  //     if (column.editable) {
  //       this.form.addControl(
  //         column.field,
  //         new FormControl('', Validators.required)
  //       );
  //     }
  //   });
  // }

  // public save(row: any): void {    
  //   for (const control in this.form.controls) {
  //     row = { ...row,
  //       [control]: this.form.get(control)?.value };
  //   }

  //   this.inlineEditAction?.callback?.(row);
  //   this.disableInlineEdit();
  // }

  // public disableInlineEdit(): void {
  //   this.inlineEditMode = false;
  //   this.editRow = undefined;
  //   this.columns?.forEach(column => {
  //     if (column.editable) {
  //       this.form.patchValue({
  //         [column.field]: ''
  //       });
  //     }
  //   })
  // }

  // public enableInlineEdit(row: any): void {
  //   this.inlineEditMode = true;
  //   this.editRow = row;
  //   this.columns?.forEach(column => {
  //     if (column.editable) {
  //       this.form.patchValue({
  //         [column.field]: row[column.field]
  //       });
  //     }
  //   })
  // }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete(); 
  }

}