import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { EventActions } from '../../state/event.actions';
import { selectSponsoredCard } from '../../state/event.selectors';

@Component({
  selector: 'app-event-overview',
  templateUrl: './event-overview.component.html',
  styleUrls: ['./event-overview.component.scss']
})
export class EventOverviewComponent {

  public sponsored = this.store.select(selectSponsoredCard);
  
  constructor(
    private store: Store, 
  ) {
    this.store.dispatch(EventActions.getSponsoredEvent());
  }

}