import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Column, RowAction, SortPaginate } from 'src/app/shared/table/typings/table';
import { OrganisationEntity } from 'src/schema/schema';
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
      label: 'addres',
      type: 'ADDRESS'
    },
  ];
  
  constructor(
    private store: Store,
  ) { }
}