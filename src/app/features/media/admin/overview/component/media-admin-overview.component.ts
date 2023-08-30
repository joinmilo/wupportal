import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { FilterSortPaginateInput, InfoMediaEntity } from 'src/app/core/api/generated/schema';
import { TranslationService } from 'src/app/core/services/translation.service';
import { Column, RowDefaultAction } from 'src/app/shared/widgets/table/typings/table';
import { MediaAdminOverviewActions } from '../state/media-admin-overview.actions';
import { selectOverviewData } from '../state/media-portal-overview.selectors';
@Component({
  selector: 'app-media-admin-overview',
  templateUrl: './media-admin-overview.component.html',
  styleUrls: ['./media-admin-overview.component.scss']
})
export class MediaAdminOverviewComponent {

  public media = this.store.select(selectOverviewData);

  public defaultActions: RowDefaultAction[] = [
    'LIKE', 'SHARE'
  ];

  public columns: Column<InfoMediaEntity>[] = [
    {
      field: 'category.name',
      label: 'category',
      type: row => this.translationService.translatable(row.category?.translatables, 'name')
    },
    {
      field: 'media.extension',
      label: 'type',
    }
  ];

  constructor(
    private store: Store,
    private translationService: TranslationService,

    public dialog: MatDialog,
  ) { }

  public updateParams(params: FilterSortPaginateInput) {
    this.store.dispatch(MediaAdminOverviewActions.updateParams(params));
  }
}
