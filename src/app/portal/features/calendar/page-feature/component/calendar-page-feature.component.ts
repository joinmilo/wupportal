import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { EventEntity, Maybe } from 'src/schema/schema';

@Component({
  selector: 'app-calendar-page-feature',
  templateUrl: './calendar-page-feature.component.html',
  styleUrls: ['./calendar-page-feature.component.scss']
})
export class CalendarPageFeatureComponent {
  
  public events?: Maybe<EventEntity>[];

  constructor(
    private store: Store,
  ) {}

  public selectedEvents(events?: Maybe<EventEntity>[]): void {
    this.events = events;
  }

}
