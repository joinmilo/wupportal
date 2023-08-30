import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { EventEntity, FilterSortPaginateInput } from 'src/app/core/api/generated/schema';
import { TranslationService } from 'src/app/core/services/translation.service';
import { Column, RowDefaultAction } from 'src/app/shared/widgets/table/typings/table';
import { EventAdminOverviewActions } from '../state/event-admin-overview.actions';
import { selectOverviewData } from '../state/event-portal-overview.selectors';

@Component({
  selector: 'app-event-admin-overview',
  templateUrl: './event-admin-overview.component.html',
  styleUrls: ['./event-admin-overview.component.scss']
})
export class EventAdminOverviewComponent {

  public events = this.store.select(selectOverviewData);

  public defaultActions: RowDefaultAction[] = [
    'LIKE', 'SHARE'
  ];

  public columns: Column<EventEntity>[] = [
    {
      field: 'translatables.name',
      label: 'activities',
      type: row => this.translationService.translatable(row.translatables, 'name')
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
    this.store.dispatch(EventAdminOverviewActions.updateParams(params));
  }
}
