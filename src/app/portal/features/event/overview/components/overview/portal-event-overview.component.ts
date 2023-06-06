import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PortalEventOverviewActions } from '../../state/portal-event-overview.actions';
import { selectDisplayType, selectSponsoredEvent } from '../../state/portal-event-overview.selectors';

@Component({
  selector: 'app-portal-event-overview',
  templateUrl: './portal-event-overview.component.html',
  styleUrls: ['./portal-event-overview.component.scss']
})
export class PortalEventOverviewComponent {

  public sponsored = this.store.select(selectSponsoredEvent);

  public displayType = this.store.select(selectDisplayType);
  
  constructor(
    private store: Store,
  ) {
    this.store.dispatch(PortalEventOverviewActions.getSponsoredEvent());
  }

}