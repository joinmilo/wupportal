import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { DealEntity, FilterSortPaginateInput } from 'src/app/core/api/generated/schema';
import { TranslationService } from 'src/app/core/services/translation.service';
import { Column, RowAction } from 'src/app/shared/widgets/table/typings/table';
import { DealAdminOverviewActions } from '../state/deal-admin-overview.actions';
import { selectOverviewData } from '../state/deal-portal-overview.selectors';

@Component({
  selector: 'app-deal-admin-overview',
  templateUrl: './deal-admin-overview.component.html',
  styleUrls: ['./deal-admin-overview.component.scss']
})
export class DealAdminOverviewComponent {

  public deals = this.store.select(selectOverviewData);

  public actions: RowAction<DealEntity>[] = [
    { type: 'LIKE' },
    { type: 'SHARE' }
  ];

  public columns: Column<DealEntity>[] = [
    {
      field: 'translatables.name',
      label: 'deals',
      type: row => this.translationService.translatable(row.translatables, 'name')
    },
    {
      field: 'category',
      label: 'category',
      type: 'CATEGORY',
    },
  ];

  constructor(
    private store: Store,
    private translationService: TranslationService
  ) { }

  public updateParams(params: FilterSortPaginateInput) {
    this.store.dispatch(DealAdminOverviewActions.updateParams(params));
  }
}
