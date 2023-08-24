import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrganisationEntity } from 'src/app/core/api/generated/schema';
import { Column, RowAction, SortPaginate } from 'src/app/shared/widgets/table/typings/table';
import { selectOverviewData } from '../../state/portal-organisation-overview.selectors';

@Component({
  selector: 'app-portal-organisation-overview-table',
  templateUrl: './portal-organisation-overview-table.component.html',
  styleUrls: ['./portal-organisation-overview-table.component.scss']
})
export class PortalOrganisationOverviewTableComponent {

  public organisations = this.store.select(selectOverviewData);

  @Output()
  public sortPaginate = new EventEmitter<SortPaginate>();

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
    {
      field: 'contact.phone',
      label: 'phone',
      sort: true,
    },
    {
      field: 'address',
      label: 'address',
      type: 'ADDRESS'
    },
  ];
  
  constructor(
    private store: Store,
  ) { }
}