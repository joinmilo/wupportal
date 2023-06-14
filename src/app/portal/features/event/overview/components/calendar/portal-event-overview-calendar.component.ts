import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectOverviewDataCategories } from '../../state/portal-event-overview.selectors';

@Component({
  selector: 'app-portal-event-overview-calendar',
  templateUrl: './portal-event-overview-calendar.component.html',
  styleUrls: ['./portal-event-overview-calendar.component.scss']
})
export class PortalEventOverviewCalendarComponent {

  public categories = this.store.select(selectOverviewDataCategories);
  
  constructor(
    private store: Store,
  ) { }

}