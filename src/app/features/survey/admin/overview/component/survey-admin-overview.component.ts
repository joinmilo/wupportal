import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterSortPaginateInput, SurveyEntity } from 'src/app/core/api/generated/schema';
import { Column, RowAction } from 'src/app/shared/widgets/table/typings/table';
import { SurveyAdminOverviewActions } from '../state/survey-admin-overview.actions';
import { selectOverviewData } from '../state/survey-portal-overview.selectors';

@Component({
  selector: 'app-survey-admin-overview',
  templateUrl: './survey-admin-overview.component.html',
  styleUrls: ['./survey-admin-overview.component.scss']
})
export class SurveyAdminOverviewComponent {

  public surveys = this.store.select(selectOverviewData);

  public actions: RowAction<SurveyEntity>[] = [
    { type: 'LIKE' },
    { type: 'SHARE' }
  ];

  public columns: Column<SurveyEntity>[] = [
    {
      field: 'name',
      label: 'surveys'
    },
  ];

  constructor(
    private store: Store,
  ) { }

  public updateParams(params: FilterSortPaginateInput) {
    this.store.dispatch(SurveyAdminOverviewActions.updateParams(params));
  }
}
