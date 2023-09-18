import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FilterSortPaginateInput, LabelEntity } from 'src/app/core/api/generated/schema';
import { TranslationService } from 'src/app/core/services/translation.service';
import { Column, RowAction } from 'src/app/shared/widgets/table/typings/table';
import { AdminSettingsLabelActions } from '../state/admin-settings-label.actions';
import { selectLabels } from '../state/admin-settings-label.selectors';

@Component({
  selector: 'app-admin-settings-label',
  templateUrl: './admin-settings-label.component.html',
  styleUrls: ['./admin-settings-label.component.scss'],
})
export class AdminSettingsLabelComponent {

  public labels = this.store.select(selectLabels);

  public actions: RowAction<LabelEntity>[] = [
    {
      icon: 'pen-to-square',
      callback: row =>
        this.router.navigate([row?.id, 'edit'], { relativeTo: this.activatedRoute }),
      tooltipLabel: 'edit',
      inlineEdit: true
    },
  ];

  public columns: Column<LabelEntity>[] = [
    {
      field: 'tagId',
      label: 'identifier',
      sort: true
    },
    {
      field: 'content',
      label: 'content',
      type: (row) => this.translationService.translatable(row.translatables, 'content'),
      editable: true,
    },
  ];

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translationService: TranslationService,
  ) { }

  public updateParams(params: FilterSortPaginateInput) {
    this.store.dispatch(AdminSettingsLabelActions.updateParams(params));
  }
}
