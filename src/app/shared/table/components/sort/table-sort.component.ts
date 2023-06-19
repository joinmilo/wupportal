import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { Sort, SortOption } from '../../typings/table';

@Component({
  selector: 'app-table-sort',
  templateUrl: './table-sort.component.html',
  styleUrls: ['./table-sort.component.scss']
})
export class TableSortComponent implements OnInit, OnDestroy {

  @Input()
  public options?: SortOption[];

  @Input()
  public queryParams = true;

  @Output()
  public sortChange = new EventEmitter<Sort>();

  public control = new FormControl();

  private destroy = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.watchValueChange();
  }
  
  public ngOnInit(): void {
    if (this.queryParams) {
      this.activatedRoute.queryParams
        .pipe(take(1))
        .subscribe((params: Sort) =>
          this.control.setValue(this.options?.find(option => option.field === params.sort &&
            (params.dir === 'desc' && params.dir === option.dir 
              || params.dir !== 'desc' )), {emitEvent: false })
        );
    }
  }

  private watchValueChange(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe((option?: SortOption) => {
        if (option) {
          this.sortChange.emit({
            dir: option.dir ?? 'asc',
            sort: option.field
          });
  
          if (this.queryParams) {
            this.router.navigate([], {
              queryParams: {
                dir: option.dir,
                sort: option.field,
              },
              queryParamsHandling: 'merge',
            });
          }
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}