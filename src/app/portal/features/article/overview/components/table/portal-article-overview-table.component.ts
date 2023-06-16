import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslationService } from 'src/app/core/services/translation.service';
import { Column, RowAction, SortPaginate } from 'src/app/shared/table/typings/table';
import { ArticleEntity, FilterSortPaginateInput } from 'src/schema/schema';
import { PortalArticleOverviewActions } from '../../state/portal-article-overview.actions';
import { selectOverviewData } from '../../state/portal-article-overview.selectors';

@Component({
  selector: 'app-portal-article-overview-table',
  templateUrl: './portal-article-overview-table.component.html',
  styleUrls: ['./portal-article-overview-table.component.scss']
})
export class PortalArticleOverviewTableComponent {

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
      field: 'author.user.firstName',
      label: 'firstName',
      sort: true,
    },
    {
      field: 'author.user.lastName',
      label: 'firstName',
      sort: true,
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
    this.store.dispatch(PortalArticleOverviewActions.updateParams(params));
  }
}