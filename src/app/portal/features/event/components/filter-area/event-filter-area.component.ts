import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { EventActions } from '../../state/event.actions';
import { selectSponsoredCard } from '../../state/event.selectors';

@Component({
  selector: 'app-event-filter-area',
  templateUrl: './event-filter-area.component.html',
  styleUrls: ['./event-filter-area.component.scss']
})
export class EventFilterAreaComponent {

  public sponsored = this.store.select(selectSponsoredCard);
  
  constructor(
    private store: Store, 
  ) {
    this.store.dispatch(EventActions.getSponsoredEvent());
  }

}