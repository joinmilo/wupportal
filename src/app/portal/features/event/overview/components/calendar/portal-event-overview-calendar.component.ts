import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Maybe } from 'graphql/jsutils/Maybe';
import { tap } from 'rxjs';
import { EventEntity } from 'src/schema/schema';
import { selectRawParams } from '../../state/portal-event-overview.selectors';

@Component({
  selector: 'app-portal-event-overview-calendar',
  templateUrl: './portal-event-overview-calendar.component.html',
  styleUrls: ['./portal-event-overview-calendar.component.scss']
})
export class PortalEventOverviewCalendarComponent {

  public events?: Maybe<EventEntity>[];

  public params = this.store.select(selectRawParams)
    .pipe(tap(test => console.log('here ever', test)));
  
  constructor(
    private store: Store,
  ) { }

  public selectedEvents(events?: Maybe<EventEntity>[]): void {
    this.events = events;
    console.log(this.events);
  }

}