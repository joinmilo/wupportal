import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslationService } from 'src/app/core/services/translation.service';
import { Column, RowAction, SortPaginate } from 'src/app/shared/widgets/table/typings/table';
import { ArticleEntity, FilterSortPaginateInput } from 'src/schema/schema';
import { ArticleAdminOverviewActions } from '../state/article-admin-overview.actions';
import { selectOverviewData } from '../state/article-portal-overview.selectors';

@Component({
  selector: 'app-article-admin-overview',
  templateUrl: './article-admin-overview.component.html',
  styleUrls: ['./article-admin-overview.component.scss']
})
export class ArticleAdminOverviewComponent {

  @Output()
  public sortPaginate = new EventEmitter<SortPaginate>();

  public articles = this.store.select(selectOverviewData);

  public actions: RowAction<ArticleEntity>[] = [
    { type: 'LIKE' },
    { type: 'SHARE' }
  ];

  public columns: Column<ArticleEntity>[] = [
    {
      field: 'translatables.name',
      label: 'title',
      type: row => this.translationService.translatable(row.translatables, 'name')
    },
    {
      field: 'author.user.lastName',
      label: 'author',
      type: row => `${row.author?.user?.firstName} ${row.author?.user?.lastName}`
    },
    {
      field: 'modified',
      label: 'date',
      type: 'DATETIME',
      sort: true,
    },
    {
      field: 'category',
      label: 'category',
      type: 'CATEGORY',
    },
  ];
  
  constructor(
    private store: Store,
    private translationService: TranslationService,
  ) { }

  public updateParams(params: FilterSortPaginateInput) {
    this.store.dispatch(ArticleAdminOverviewActions.updateParams(params));
  }
}