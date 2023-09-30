import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SchedulerActions } from '../../state/scheduler.actions';
import { selectErrors } from '../../state/scheduler.selectors';

@Component({
  selector: 'app-scheduler-execute',
  templateUrl: './scheduler-execute.component.html',
  styleUrls: ['./scheduler-execute.component.scss'],
})
export class SchedulerExecuteComponent {

  public errors = this.store.select(selectErrors);

  constructor(
    private store: Store,
  ) { }

  public generate(): void {    
    this.store.dispatch(SchedulerActions.generateResult());
  }

}
