import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectOverviewDataMarkers } from '../../state/portal-event-overview.selectors';

@Component({
  selector: 'app-portal-event-overview-map',
  templateUrl: './portal-event-overview-map.component.html',
  styleUrls: ['./portal-event-overview-map.component.scss']
})
export class PortalEventOverviewMapComponent {

  public markers = this.store.select(selectOverviewDataMarkers);
  
  constructor(
    private store: Store,
  ) { }

}