import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { eventSlug } from '../../constants/event.constant';
import { EventActions } from '../../state/event.actions';
import { selectEventDetails } from '../../state/event.selectors';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  public eventDetails = this.store.select(selectEventDetails);

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store) { }

  ngOnInit() {
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.activatedRoute.queryParams.subscribe(params => {
      const slug = params[eventSlug];
      this.store.dispatch(EventActions.getEventDetails(slug));
    });
  }

}
