import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectOverviewDataMarkers } from '../../state/portal-deal-overview.selectors';

@Component({
  selector: 'app-portal-deal-overview-map',
  templateUrl: './portal-deal-overview-map.component.html',
  styleUrls: ['./portal-deal-overview-map.component.scss']
})
export class PortalDealOverviewMapComponent {

  public markers = this.store.select(selectOverviewDataMarkers);
  
  constructor(
    private store: Store,
  ) { }

}