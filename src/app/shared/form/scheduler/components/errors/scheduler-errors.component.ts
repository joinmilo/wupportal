import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectErrors } from '../../state/scheduler.selectors';

@Component({
  selector: 'app-scheduler-errors',
  templateUrl: './scheduler-errors.component.html',
  styleUrls: ['./scheduler-errors.component.scss'],
})
export class SchedulerErrorsComponent {

  public errors = this.store.select(selectErrors);

  constructor(
    private store: Store,
  ) {}
  

}
