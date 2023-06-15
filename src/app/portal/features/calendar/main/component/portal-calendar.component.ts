import { Component } from '@angular/core';
import { EventEntity, Maybe } from 'src/schema/schema';


@Component({
  selector: 'app-portal-calendar',
  templateUrl: './portal-calendar.component.html',
  styleUrls: ['./portal-calendar.component.scss']
})
export class PortalCalendarComponent {

  public events?: Maybe<EventEntity>[];

  public title?: string;
}