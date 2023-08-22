import { Component } from '@angular/core';
import { EventEntity, Maybe } from 'src/schema/schema';

@Component({
  selector: 'app-calendar-embedding',
  templateUrl: './calendar-embedding.component.html',
  styleUrls: ['./calendar-embedding.component.scss']
})
export class CalendarEmbeddingComponent {
  
  public events?: Maybe<EventEntity>[];

  public selectedEvents(events?: Maybe<EventEntity>[]): void {
    this.events = events;
  }

}
