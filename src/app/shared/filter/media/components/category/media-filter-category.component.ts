import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FilterService } from 'ngx-cinlib/filters';
import { Subject, takeUntil } from 'rxjs';
import { Maybe } from 'src/app/core/api/generated/schema';
import { MediaFilterQueryDefinition } from 'src/app/core/typings/filter-params/media-filter-param';
import { MediaFilterActions } from '../../state/media-filter.actions';
import { selectCategories } from '../../state/media-filter.selectors';

@Component({
  selector: 'app-media-filter-category',
  templateUrl: './media-filter-category.component.html',
  styleUrls: ['./media-filter-category.component.scss']
})
export class MediaFilterCategoryComponent implements OnInit, OnDestroy {

  @Input()
  public queryParamKey = MediaFilterQueryDefinition.mediaCategories;

  @Output()
  public valueChanged = new EventEmitter<Maybe<string[]> | undefined>();

  public control = new FormControl();

  private destroy = new Subject<void>();

  public categories = this.store.select(selectCategories);

  constructor(
    private filterService: FilterService,
    private router: Router,
    private store: Store,
  ) {
    this.store.dispatch(MediaFilterActions.getCategories());
    this.watchValueChange();
  }

  public ngOnInit(): void {
    this.filterService.queryParams()
      .pipe(takeUntil(this.destroy))
      .subscribe(params => {
        const value = typeof params?.[this.queryParamKey] === 'string'
          ? [params[this.queryParamKey]]
          : params?.[this.queryParamKey];

        this.control.setValue(value, {
          emitEvent: false,
        });
      });
  }

  private watchValueChange(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe((ids: Maybe<string[]>) => {
        this.filterService.updateParam(this.queryParamKey, ids);
        this.valueChanged.emit(ids);
      });
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
