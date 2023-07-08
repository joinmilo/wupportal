import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectOverviewDataMarkers } from '../../state/portal-organisation-overview.selectors';

@Component({
  selector: 'app-portal-organisation-overview-map',
  templateUrl: './portal-organisation-overview-map.component.html',
  styleUrls: ['./portal-organisation-overview-map.component.scss']
})
export class PortalOrganisationOverviewMapComponent {

  public markers = this.store.select(selectOverviewDataMarkers);
  
  constructor(
    private store: Store,
  ) { }

}