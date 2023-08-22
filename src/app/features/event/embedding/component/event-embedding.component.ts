import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { EventEmbeddingActions } from '../state/event-embedding.actions';
import { selectRecentEvents } from '../state/event-embedding.selectors';

@Component({
  selector: 'app-event-embedding',
  templateUrl: './event-embedding.component.html',
  styleUrls: ['./event-embedding.component.scss']
})
export class EventEmbeddingComponent {
  
  public events = this.store.select(selectRecentEvents);

  constructor(
    private store: Store, 
  ) {
    this.store.dispatch(EventEmbeddingActions.getRecentEvents());
  }

}
