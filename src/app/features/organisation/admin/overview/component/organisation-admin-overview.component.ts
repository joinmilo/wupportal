import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterSortPaginateInput, OrganisationEntity } from 'src/app/core/api/generated/schema';
import { Column, RowAction } from 'src/app/shared/widgets/table/typings/table';
import { OrganisationAdminOverviewActions } from '../state/organisation-admin-overview.actions';
import { selectOverviewData } from '../state/organisation-portal-overview.selectors';

@Component({
  selector: 'app-organisation-admin-overview',
  templateUrl: './organisation-admin-overview.component.html',
  styleUrls: ['./organisation-admin-overview.component.scss']
})
export class OrganisationAdminOverviewComponent {

  public organisations = this.store.select(selectOverviewData);

  public actions: RowAction<OrganisationEntity>[] = [
    { type: 'LIKE' },
    { type: 'SHARE' }
  ];

  public columns: Column<OrganisationEntity>[] = [
    {
      field: 'name',
      label: 'name',
      sort: true,
    },
    {
      field: 'contact.email',
      label: 'email',
      sort: true,
    },
  ];

  constructor(
    private store: Store
  ) { }

  public updateParams(params: FilterSortPaginateInput) {
    this.store.dispatch(OrganisationAdminOverviewActions.updateParams(params));
  }
}
