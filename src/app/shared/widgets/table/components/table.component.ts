import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { ContentEntity } from 'src/app/core/typings/content-entity';
import { Column, PageableList, RowAction, SortPaginate } from '../typings/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> implements OnInit, OnDestroy {

  @Input()
  public actions?: RowAction<T>[];

  @Input()
  public columns?: Column<T>[];

  @Input()
  public data?: Observable<PageableList<T> | undefined>;

  @Input()
  public entity?: ContentEntity;

  @Input()
  public initParams: SortPaginate = {
    page: 0,
    size: 10
  };

  @Input()
  public queryParams = true;

  @Output()
  public sortPaginate = new EventEmitter<SortPaginate>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.queryParams && this.activatedRoute.queryParams
      .pipe(take(1))
      .subscribe((params: SortPaginate) => this.sortPaginate.emit(this.initParams = {
        dir: params.dir,
        page: params.page ?? this.initParams.page,
        size: params.size ?? this.initParams.size,
        sort: params.sort
      }));
  }

  public emitSortPaginate(sortPage: SortPaginate): void {
    if (this.queryParams) {
      this.router.navigate([], {
        queryParams: sortPage,
        queryParamsHandling: 'merge',
      });
    }
    this.sortPaginate.emit(sortPage)
  }

  public ngOnDestroy(): void {
    this.emitSortPaginate({
      dir: null,
      page: null,
      size: null,
      sort: null,
    });
  }
} 