import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, tap } from 'rxjs';
import { TableActions } from '../../state/table.actions';
import { selectActions, selectClickable, selectColumns, selectData } from '../../state/table.selectors';
import { TablePaginatorComponent } from '../paginator/table-paginator.component';

@Component({
  selector: 'app-table-mobile',
  templateUrl: './table-mobile.component.html',
  styleUrls: ['./table-mobile.component.scss'],
})
export class TableMobileComponent<T> implements AfterViewInit, OnDestroy {
  
  public actions = this.store.select(selectActions);

  public columns = this.store.select(selectColumns);

  public data = this.store.select(selectData);

  public clickable = this.store.select(selectClickable);

  @ViewChild('container')
  private container?: ElementRef;

  private destroy = new Subject<void>();

  @ViewChild(TablePaginatorComponent)
  public paginator!: TablePaginatorComponent;

  constructor(
    private store: Store,
  ) { }

  public ngAfterViewInit(): void {
    this.paginator.page.pipe(
      tap(() => this.store.dispatch(
        TableActions.setParams({
          page: this.paginator.pageIndex,
          size: this.paginator.pageSize,
        })
      )),
      tap(() => this.container?.nativeElement?.scrollIntoView()),
      takeUntil(this.destroy),
    ).subscribe();
  }

  public rowClicked(row: T): void {
    this.store.dispatch(TableActions.rowClicked(row));
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}