import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrganisationFilterQueryParams } from 'src/app/core/typings/filter-param';
import { DisplayType } from 'src/app/core/typings/overview-display';
import { RadioInput } from 'src/app/shared/form/typings/radio-input';
import { FilterSortPaginateInput } from 'src/schema/schema';
import { displayQueryParam } from '../constants/portal-organisation-overview.constants';
import { PortalOrganisationOverviewActions } from '../state/portal-organisation-overview.actions';
import { selectOverviewData, selectSponsoredOrganisation } from '../state/portal-organisation-overview.selectors';

@Component({
  selector: 'app-portal-organisation-overview',
  templateUrl: './portal-organisation-overview.component.html',
  styleUrls: ['./portal-organisation-overview.component.scss']
})
export class PortalOrganisationOverviewComponent {

  public displayType = DisplayType.Card;

  public displayQueryParam = displayQueryParam;

  public inputs: RadioInput[] = [
    {
      icon: ['fas', 'shapes'],
      label: 'list',
      value: DisplayType.Card
    },
    {
      icon: ['fas', 'map-location-dot'],
      label: 'mapview',
      value: DisplayType.Map
    },
    {
      icon: ['fas', 'tree-city'],
      label: 'suburb',
      value: DisplayType.Suburb
    },
    {
      icon: ['fas', 'list'],
      label: 'table',
      value: DisplayType.Table
    },
  ];

  public events = this.store.select(selectOverviewData);

  public sponsored = this.store.select(selectSponsoredOrganisation);
  
  constructor(
    private store: Store,
  ) {
    this.store.dispatch(PortalOrganisationOverviewActions.getSponsoredOrganisation());
  }

  public updateParams(params: FilterSortPaginateInput) {
    this.store.dispatch(PortalOrganisationOverviewActions.updateParams(params));
  }

  public updateRawParams(params: OrganisationFilterQueryParams) {
    this.store.dispatch(PortalOrganisationOverviewActions.updateRawParams(params));
  }

}