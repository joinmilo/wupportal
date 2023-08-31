import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ContestEntity, FilterSortPaginateInput } from 'src/app/core/api/generated/schema';
import { TranslationService } from 'src/app/core/services/translation.service';
import { Column, RowDefaultAction } from 'src/app/shared/widgets/table/typings/table';
import { ContestAdminOverviewActions } from '../state/contest-admin-overview.actions';
import { selectOverviewData } from '../state/contest-portal-overview.selectors';

@Component({
  selector: 'app-contest-admin-overview',
  templateUrl: './contest-admin-overview.component.html',
  styleUrls: ['./contest-admin-overview.component.scss']
})
export class ContestAdminOverviewComponent {

  public contests = this.store.select(selectOverviewData);

  public actions: RowDefaultAction[] = [
    'LIKE', 'SHARE'
  ];

  public columns: Column<ContestEntity>[] = [
    {
      field: 'translatables.name',
      label: 'contests',
      type: row => this.translationService.translatable(row.translatables, 'name')
    },
    {
      field: 'contact.name',
      label: 'organizator',
      type: row => `${row.contact?.name}`
    },
    {
      field: 'type.name',
      label: 'type',
      type: row => this.translationService.translatable(row.type?.translatables, 'name')
    },
    {
      field: 'voteEndDate',
      label: 'voteEndDate',
      type: 'DATETIME',
      sort: true,
    }
  ];

  constructor(
    private store: Store,
    private translationService: TranslationService,
  ) { }

  public updateParams(params: FilterSortPaginateInput) {
    this.store.dispatch(ContestAdminOverviewActions.updateParams(params));
  }
}
