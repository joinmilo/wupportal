import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { DealEntity, FilterSortPaginateInput } from 'src/app/core/api/generated/schema';
import { TranslationService } from 'src/app/core/services/translation.service';
import { Column, RowAction, SortPaginate } from 'src/app/shared/widgets/table/typings/table';
import { PortalDealOverviewActions } from '../../state/portal-deal-overview.actions';
import { selectOverviewData } from '../../state/portal-deal-overview.selectors';

@Component({
  selector: 'app-portal-deal-overview-table',
  templateUrl: './portal-deal-overview-table.component.html',
  styleUrls: ['./portal-deal-overview-table.component.scss']
})
export class PortalDealOverviewTableComponent {

  @Output()
  public sortPaginate = new EventEmitter<SortPaginate>();

  public deals = this.store.select(selectOverviewData);

  public actions: RowAction<DealEntity>[] = [
    { type: 'LIKE' },
    { type: 'SHARE' }
  ];

  public columns: Column<DealEntity>[] = [
    {
      field: 'translatables.name',
      label: 'title',
      type: row => this.translationService.translatable(row.translatables, 'name')
    },
    {
      field: 'creator.user.lastName',
      label: 'createdBy',
      type: row => row.creator?.user?.firstName && row.creator?.user?.lastName
        ? `${row.creator?.user?.firstName} ${row.creator?.user?.lastName}`
        : row.contact?.name
    },
    {
      field: 'contact.email',
      label: 'email',
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
    this.store.dispatch(PortalDealOverviewActions.updateParams(params));
  }
}