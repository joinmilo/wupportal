import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RadioInput } from 'src/app/core/typings/radio-input';
import { EventActions } from '../../state/event.actions';
import { selectSponsoredCard } from '../../state/event.selectors';

export enum DisplayType {
  Calendar = 'calendar',
  Category = 'category',
  List = 'list',
  Map = 'map',
}
@Component({
  selector: 'app-event-filter-area',
  templateUrl: './event-filter-area.component.html',
  styleUrls: ['./event-filter-area.component.scss']
})
export class EventFilterAreaComponent {

  public sponsored = this.store.select(selectSponsoredCard);

  public inputs: RadioInput[] = [
    {
      icon: ['fas', 'shapes'],
      label: 'category',
      value: DisplayType.Category
    },
    {
      icon: ['fas', 'calendar'],
      label: 'calendar',
      value: DisplayType.Calendar
    },
  ];

  public initValue = DisplayType.Calendar;
  
  constructor(
    private store: Store, 
  ) {
    this.store.dispatch(EventActions.getSponsoredEvent());
  }

  valueChanged($event: DisplayType) {
    console.log($event);
  }

}